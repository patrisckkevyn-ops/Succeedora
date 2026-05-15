const KV_URL = String(process.env.KV_REST_API_URL || "").replace(/\/$/, "");
const KV_TOKEN = String(process.env.KV_REST_API_TOKEN || "");
const KEY_PREFIX = "succeedora:stripe";

function kvConfigured() {
  return Boolean(KV_URL && KV_TOKEN);
}

async function kvCommand(command) {
  if (!kvConfigured()) return null;
  const response = await fetch(KV_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${KV_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(payload?.error || "kv_request_failed");
    error.statusCode = response.status;
    throw error;
  }
  return payload.result;
}

async function kvGetJson(key) {
  const result = await kvCommand(["GET", key]);
  if (!result) return null;
  try {
    return typeof result === "string" ? JSON.parse(result) : result;
  } catch (error) {
    return null;
  }
}

async function kvSetJson(key, value) {
  await kvCommand(["SET", key, JSON.stringify(value)]);
  return value;
}

async function claimEvent(eventId) {
  if (!eventId || !kvConfigured()) return false;
  const result = await kvCommand(["SET", `${KEY_PREFIX}:event:${eventId}`, new Date().toISOString(), "NX", "EX", 60 * 60 * 24 * 30]);
  return result === "OK";
}

async function recordStripeWebhookLog(event, status, details = {}) {
  const entry = {
    eventId: event?.id || "",
    eventType: event?.type || "",
    status,
    details,
    createdAt: new Date().toISOString(),
  };
  console.info("[succeedora:stripe:webhook]", JSON.stringify(entry));
  if (kvConfigured() && entry.eventId) {
    await kvSetJson(`${KEY_PREFIX}:webhook-log:${entry.eventId}`, entry).catch(() => null);
  }
}

function paymentKey(sessionId) {
  return `${KEY_PREFIX}:payment:${sessionId}`;
}

function subscriptionKey(subscriptionId) {
  return `${KEY_PREFIX}:subscription:${subscriptionId}`;
}

function entitlementFrom(metadata = {}, stripeData = {}) {
  const productType = metadata.productType || "";
  const targetId = metadata.resumeId || metadata.templateId || "__global__";
  return {
    productType,
    targetId,
    planType: metadata.planType || (productType === "plan_premium" ? "premium" : productType === "plan_pro" ? "pro" : ""),
    creditsAmount: Math.max(0, Number(metadata.creditsAmount || 0)),
    resumeId: metadata.resumeId || "",
    templateId: metadata.templateId || "",
    source: "stripe_webhook",
    grantedAt: stripeData.approvedAt || stripeData.startedAt || new Date().toISOString(),
  };
}

function paymentRecord(metadata = {}, stripeData = {}, status = "paid") {
  const now = new Date().toISOString();
  return {
    userId: metadata.userId || "",
    userEmail: metadata.userEmail || "",
    productType: metadata.productType || "",
    currency: String(metadata.currency || stripeData.currency || "").toUpperCase() || "BRL",
    amount_total: Number(stripeData.amount_total || stripeData.amountTotal || 0),
    priceId: metadata.priceId || stripeData.priceId || "",
    stripeSessionId: stripeData.stripeSessionId || "",
    stripePaymentIntentId: stripeData.stripePaymentIntentId || "",
    stripeSubscriptionId: stripeData.stripeSubscriptionId || "",
    stripeCustomerId: stripeData.stripeCustomerId || "",
    status,
    createdAt: stripeData.createdAt || now,
    approvedAt: stripeData.approvedAt || stripeData.startedAt || now,
    planType: metadata.planType || "",
    creditsAmount: Math.max(0, Number(metadata.creditsAmount || 0)),
    resumeId: metadata.resumeId || "",
    templateId: metadata.templateId || "",
    entitlement: entitlementFrom(metadata, stripeData),
  };
}

async function persistPayment(record) {
  if (!kvConfigured()) return { applied: false, reason: "server_persistent_store_not_configured" };
  const id = record.stripeSessionId || record.stripeSubscriptionId;
  if (!id) return { applied: false, reason: "missing_stripe_record_id" };
  await kvSetJson(record.stripeSessionId ? paymentKey(record.stripeSessionId) : subscriptionKey(record.stripeSubscriptionId), record);
  if (record.stripeSubscriptionId) await kvSetJson(subscriptionKey(record.stripeSubscriptionId), record);
  if (record.userId) {
    await kvCommand(["SADD", `${KEY_PREFIX}:user:${record.userId}:payments`, id]).catch(() => null);
    if (record.stripeCustomerId) await kvCommand(["SET", `${KEY_PREFIX}:user:${record.userId}:stripeCustomerId`, record.stripeCustomerId]).catch(() => null);
  }
  return { applied: true, payment: record };
}

async function findStripeCustomerForUser(userId) {
  if (!kvConfigured()) {
    await recordStripeWebhookLog({ type: "customer.lookup" }, "not_applied", {
      reason: "server_persistent_store_not_configured",
      userId: userId || "",
    });
    return null;
  }
  return kvCommand(["GET", `${KEY_PREFIX}:user:${userId}:stripeCustomerId`]);
}

async function grantStripeOneTimeEntitlement(metadata, stripeData) {
  const claimed = await claimEvent(stripeData.eventId);
  if (!claimed) return { applied: false, reason: kvConfigured() ? "duplicate_event" : "server_persistent_store_not_configured" };
  const record = paymentRecord(metadata, stripeData, "paid");
  return persistPayment(record);
}

async function activateStripeSubscription(metadata, stripeData) {
  const claimed = await claimEvent(stripeData.eventId);
  if (!claimed) return { applied: false, reason: kvConfigured() ? "duplicate_event" : "server_persistent_store_not_configured" };
  const record = paymentRecord(metadata, stripeData, ["active", "trialing"].includes(stripeData.status) || !stripeData.status ? "active" : stripeData.status);
  record.currentPeriodEnd = stripeData.currentPeriodEnd || "";
  return persistPayment(record);
}

async function markStripeSubscriptionCancelled(metadata, stripeData) {
  const claimed = await claimEvent(stripeData.eventId);
  if (!claimed) return { applied: false, reason: kvConfigured() ? "duplicate_event" : "server_persistent_store_not_configured" };
  const record = paymentRecord(metadata, stripeData, stripeData.status || "cancelled");
  record.currentPeriodEnd = stripeData.currentPeriodEnd || "";
  return persistPayment(record);
}

async function markStripePaymentFailed(metadata, stripeData) {
  const record = paymentRecord(metadata, stripeData, "failed");
  return persistPayment(record);
}

async function findWebhookPaymentBySession(sessionId) {
  if (!kvConfigured() || !sessionId) return null;
  return kvGetJson(paymentKey(sessionId));
}

module.exports = {
  recordStripeWebhookLog,
  findStripeCustomerForUser,
  grantStripeOneTimeEntitlement,
  activateStripeSubscription,
  markStripeSubscriptionCancelled,
  markStripePaymentFailed,
  findWebhookPaymentBySession,
};
