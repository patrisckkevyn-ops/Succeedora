const { json, readBody } = require("../_lib/http");
const { verifyStripeSignature } = require("../_lib/stripe-webhook");
const { stripeGet } = require("../_lib/stripe-api");
const {
  recordStripeWebhookLog,
  grantStripeOneTimeEntitlement,
  activateStripeSubscription,
  markStripeSubscriptionCancelled,
  markStripePaymentFailed,
} = require("../_lib/succeedora-store");

function metadataFrom(object = {}) {
  return object.metadata || object.subscription_details?.metadata || {};
}

function stripePeriodEnd(object = {}) {
  const timestamp = object.current_period_end || object.lines?.data?.[0]?.period?.end;
  return timestamp ? new Date(timestamp * 1000).toISOString() : "";
}

function firstPriceId(object = {}) {
  return object.metadata?.priceId || object.lines?.data?.[0]?.price?.id || object.items?.data?.[0]?.price?.id || "";
}

async function subscriptionWithMetadata(subscriptionId) {
  if (!subscriptionId) return null;
  return stripeGet(`/subscriptions/${subscriptionId}`).catch(() => null);
}

async function processCheckoutSession(event, session) {
  const metadata = metadataFrom(session);
  if (metadata.paymentProvider !== "stripe" || metadata.source !== "succeedora") return { ignored: true };
  if (session.mode === "payment") {
    if (session.payment_status !== "paid") return { ignored: true, reason: "payment_not_paid" };
    return grantStripeOneTimeEntitlement(metadata, {
      eventId: event.id,
      stripeSessionId: session.id,
      stripeCustomerId: session.customer || "",
      stripePaymentIntentId: session.payment_intent || "",
      amount_total: session.amount_total || 0,
      currency: String(session.currency || metadata.currency || "").toUpperCase(),
      priceId: metadata.priceId || "",
      receiptUrl: session.receipt_url || "",
      approvedAt: new Date().toISOString(),
    });
  }
  if (session.mode === "subscription") {
    const subscription = await subscriptionWithMetadata(session.subscription);
    return activateStripeSubscription({ ...metadata, ...metadataFrom(subscription || {}) }, {
      eventId: event.id,
      stripeSessionId: session.id,
      stripeCustomerId: session.customer || subscription?.customer || "",
      stripeSubscriptionId: session.subscription || "",
      amount_total: session.amount_total || 0,
      currency: String(session.currency || metadata.currency || "").toUpperCase(),
      priceId: metadata.priceId || firstPriceId(subscription || {}),
      startedAt: new Date().toISOString(),
      currentPeriodEnd: stripePeriodEnd(subscription || {}),
    });
  }
  return { ignored: true };
}

async function processSubscriptionEvent(event, subscription) {
  const metadata = metadataFrom(subscription);
  if (event.type === "customer.subscription.deleted") {
    return markStripeSubscriptionCancelled(metadata, {
      eventId: event.id,
      stripeCustomerId: subscription.customer || "",
      stripeSubscriptionId: subscription.id || "",
      currentPeriodEnd: stripePeriodEnd(subscription),
      status: subscription.status || "cancelled",
    });
  }
  return activateStripeSubscription(metadata, {
    eventId: event.id,
    stripeCustomerId: subscription.customer || "",
    stripeSubscriptionId: subscription.id || "",
    currency: String(subscription.currency || metadata.currency || "").toUpperCase(),
    priceId: metadata.priceId || firstPriceId(subscription),
    currentPeriodEnd: stripePeriodEnd(subscription),
    status: subscription.status || "",
  });
}

async function processInvoiceEvent(event, invoice) {
  const subscriptionId = invoice.subscription || invoice.parent?.subscription_details?.subscription || "";
  const subscription = await subscriptionWithMetadata(subscriptionId);
  const metadata = { ...metadataFrom(subscription || {}), ...metadataFrom(invoice) };
  const stripeData = {
    eventId: event.id,
    stripeCustomerId: invoice.customer || subscription?.customer || "",
    stripeSubscriptionId: subscriptionId,
    amount_total: invoice.amount_paid || invoice.amount_due || 0,
    currency: String(invoice.currency || metadata.currency || "").toUpperCase(),
    priceId: metadata.priceId || firstPriceId(invoice) || firstPriceId(subscription || {}),
    currentPeriodEnd: stripePeriodEnd(invoice) || stripePeriodEnd(subscription || {}),
    status: invoice.status || "",
  };
  if (event.type === "invoice.payment_failed") return markStripePaymentFailed(metadata, stripeData);
  return activateStripeSubscription(metadata, stripeData);
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") return json(res, 405, { success: false, error: "method_not_allowed" });
  const rawBody = await readBody(req);
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = req.headers["stripe-signature"];

  if (!verifyStripeSignature(rawBody, signature, webhookSecret)) {
    await recordStripeWebhookLog({ type: "unknown" }, "invalid_signature");
    return json(res, 400, { success: false, error: "invalid_signature" });
  }

  let event;
  try {
    event = JSON.parse(rawBody.toString("utf8"));
  } catch (error) {
    return json(res, 400, { success: false, error: "invalid_payload" });
  }

  try {
    const object = event.data?.object || {};
    let result = { ignored: true };
    if (event.type === "checkout.session.completed") result = await processCheckoutSession(event, object);
    else if (["customer.subscription.created", "customer.subscription.updated", "customer.subscription.deleted"].includes(event.type)) result = await processSubscriptionEvent(event, object);
    else if (["invoice.payment_succeeded", "invoice.payment_failed"].includes(event.type)) result = await processInvoiceEvent(event, object);
    else result = { ignored: true, reason: "unhandled_event" };

    await recordStripeWebhookLog(event, result.applied ? "processed" : "received", result);
    return json(res, 200, { received: true });
  } catch (error) {
    await recordStripeWebhookLog(event, "processing_failed", { error: error.message });
    return json(res, 500, { received: false, error: "webhook_processing_failed" });
  }
};
