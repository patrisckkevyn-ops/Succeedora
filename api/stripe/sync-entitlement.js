const { json } = require("../_lib/http");
const { stripeGet } = require("../_lib/stripe-api");
const { findWebhookPaymentBySession } = require("../_lib/succeedora-store");

function metadataFrom(object = {}) {
  return object.metadata || object.subscription_details?.metadata || {};
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
    if (!userId) return json(res, 401, { success: false, error: "auth_required" });

    const session = await stripeGet(`/checkout/sessions/${sessionId}`);
    const subscription = await subscriptionDetails(session.subscription || "");
    const metadata = { ...metadataFrom(session), ...metadataFrom(subscription || {}) };

    if (metadata.paymentProvider !== "stripe" || metadata.source !== "succeedora") {
      return json(res, 403, { success: false, error: "invalid_checkout_source" });
    }
    if (userId && metadata.userId && userId !== metadata.userId) {
      return json(res, 403, { success: false, error: "user_mismatch" });
    }

    const payment = await findWebhookPaymentBySession(sessionId);
    if (payment?.userId && payment.userId !== userId) {
      return json(res, 403, { success: false, error: "user_mismatch" });
    }
    if (!payment || !["paid", "active", "trialing"].includes(payment.status)) {
      return json(res, 202, { success: true, pending: true, status: payment?.status || "waiting_for_webhook" });
    }

    return json(res, 200, {
      success: true,
      pending: false,
      payment,
      entitlement: payment.entitlement || null,
    });
  } catch (error) {
    console.error("[succeedora:stripe:sync-entitlement]", error.message);
    return json(res, error.statusCode || 500, { success: false, error: error.message || "stripe_sync_failed" });
  }
};
