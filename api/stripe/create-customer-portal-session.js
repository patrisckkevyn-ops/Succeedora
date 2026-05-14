const { json, readBody, parseJson } = require("../_lib/http");
const { appendParam, stripeGet, stripeRequest } = require("../_lib/stripe-api");
const { stripeConfig } = require("../_lib/stripe-config");
const { findStripeCustomerForUser } = require("../_lib/succeedora-store");

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") return json(res, 405, { success: false, error: "method_not_allowed" });
  try {
    if (!stripeConfig.enabled) return json(res, 503, { success: false, error: "stripe_not_configured" });
    const body = parseJson(await readBody(req));
    const userId = String(body.userId || "").trim();
    const userEmail = normalizeEmail(body.userEmail || "");
    const requestedCustomerId = String(body.stripeCustomerId || "").trim();
    const returnUrl = String(body.returnUrl || process.env.STRIPE_CANCEL_URL || "https://succeedora.com/#/dashboard/billing").trim();

    if (!userId) return json(res, 401, { success: false, error: "auth_required" });
    const stripeCustomerId = requestedCustomerId || await findStripeCustomerForUser(userId);
    if (!stripeCustomerId) return json(res, 409, { success: false, error: "stripe_customer_not_linked" });
    if (requestedCustomerId && userEmail) {
      const customer = await stripeGet(`/customers/${requestedCustomerId}`);
      if (normalizeEmail(customer.email) !== userEmail) return json(res, 403, { success: false, error: "stripe_customer_mismatch" });
    }

    const params = new URLSearchParams();
    appendParam(params, "customer", stripeCustomerId);
    appendParam(params, "return_url", returnUrl);

    const session = await stripeRequest("/billing_portal/sessions", params);
    return json(res, 200, { success: true, portalUrl: session.url });
  } catch (error) {
    console.error("[succeedora:stripe:create-customer-portal-session]", error.message);
    return json(res, error.statusCode || 500, { success: false, error: error.message || "portal_session_failed" });
  }
};
