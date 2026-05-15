const { json } = require("../_lib/http");
const { stripeGet } = require("../_lib/stripe-api");
const { buildUserAccessFromKv, findWebhookPaymentBySession, kvConfigured } = require("../_lib/succeedora-store");

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
    const userId = String(url.searchParams.get("user_id") || url.searchParams.get("userId") || "").trim();
    const userEmail = String(url.searchParams.get("user_email") || url.searchParams.get("userEmail") || "").trim().toLowerCase();
    if (!userId) return json(res, 401, { success: false, error: "auth_required" });
    if (!kvConfigured()) return json(res, 503, { success: false, error: "server_persistent_store_not_configured" });

    if (!sessionId) {
      const state = await buildUserAccessFromKv({ userId, userEmail });
      return json(res, 200, {
        success: true,
        configured: state.configured,
        access: state.access,
        payments: state.payments,
        transactions: state.transactions,
      });
    }

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

    const payment = await findWebhookPaymentBySession(sessionId);
    if (payment?.userId && payment.userId !== userId) {
      return json(res, 403, { success: false, error: "user_mismatch" });
    }
    if (!payment || !["paid", "active", "trialing"].includes(payment.status)) {
      return json(res, 202, { success: true, pending: true, status: payment?.status || "waiting_for_webhook" });
    }
    const state = await buildUserAccessFromKv({ userId, userEmail: userEmail || payment.userEmail || metadata.userEmail || "" });

    return json(res, 200, {
      success: true,
      pending: false,
      payment,
      entitlement: payment.entitlement || null,
      access: state.access,
      payments: state.payments,
      transactions: state.transactions,
    });
  } catch (error) {
    console.error("[succeedora:stripe:sync-entitlement]", error.message);
    return json(res, error.statusCode || 500, { success: false, error: error.message || "stripe_sync_failed" });
  }
};
