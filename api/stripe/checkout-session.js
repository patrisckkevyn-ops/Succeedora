const { json } = require("../_lib/http");
const { stripeGet } = require("../_lib/stripe-api");

function metadataFrom(object = {}) {
  return object.metadata || object.subscription_details?.metadata || {};
}

function stripePeriodEnd(object = {}) {
  const timestamp = object.current_period_end || object.lines?.data?.[0]?.period?.end;
  return timestamp ? new Date(timestamp * 1000).toISOString() : "";
}

async function subscriptionDetails(subscriptionId) {
  if (!subscriptionId) return null;
  return stripeGet(`/subscriptions/${subscriptionId}`).catch(() => null);
}

module.exports = async function handler(req, res) {
  if (req.method !== "GET") return json(res, 405, { success: false, error: "method_not_allowed" });
  try {
    const url = new URL(req.url, `https://${req.headers.host || "succeedora.com"}`);
    const sessionId = String(url.searchParams.get("session_id") || "").trim();
    const userId = String(url.searchParams.get("user_id") || "").trim();
    if (!/^cs_(test|live)_/.test(sessionId)) return json(res, 400, { success: false, error: "invalid_session_id" });

    const session = await stripeGet(`/checkout/sessions/${sessionId}`);
    const subscription = await subscriptionDetails(session.subscription || "");
    const metadata = { ...metadataFrom(session), ...metadataFrom(subscription || {}) };

    if (metadata.paymentProvider !== "stripe" || metadata.source !== "succeedora") {
      return json(res, 403, { success: false, error: "invalid_checkout_source" });
    }
    if (userId && metadata.userId && userId !== metadata.userId) {
      return json(res, 403, { success: false, error: "user_mismatch" });
    }

    return json(res, 200, {
      success: true,
      session: {
        id: session.id,
        mode: session.mode || "",
        status: session.status || "",
        paymentStatus: session.payment_status || "",
        customerEmail: session.customer_details?.email || session.customer_email || "",
        stripeCustomerId: session.customer || "",
        stripePaymentIntentId: session.payment_intent || "",
        stripeSubscriptionId: session.subscription || "",
        subscriptionStatus: subscription?.status || "",
        currentPeriodEnd: stripePeriodEnd(subscription || {}),
        metadata: {
          userId: metadata.userId || "",
          userEmail: metadata.userEmail || "",
          productType: metadata.productType || "",
          planType: metadata.planType || "",
          resumeId: metadata.resumeId || "",
          templateId: metadata.templateId || "",
          creditsAmount: metadata.creditsAmount || "",
        },
      },
    });
  } catch (error) {
    console.error("[succeedora:stripe:checkout-session]", error.message);
    return json(res, error.statusCode || 500, { success: false, error: error.message || "checkout_session_lookup_failed" });
  }
};
