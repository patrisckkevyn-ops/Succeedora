const { json, readBody, parseJson } = require("../_lib/http");
const { appendParam, appendMetadata, stripeRequest } = require("../_lib/stripe-api");
const { stripeConfig, stripeProduct } = require("../_lib/stripe-config");

function cleanUrl(value, fallback) {
  const url = String(value || fallback || "").trim();
  if (!url) return "";
  try {
    const parsed = new URL(url);
    if (!["https:", "http:"].includes(parsed.protocol)) return fallback || "";
    return parsed.toString();
  } catch (error) {
    return fallback || "";
  }
}

function checkoutUrlWithSessionId(value) {
  if (!value) return value;
  return value.includes("{CHECKOUT_SESSION_ID}") || value.includes("session_id=")
    ? value
    : `${value}${value.includes("?") ? "&" : "?"}session_id={CHECKOUT_SESSION_ID}`;
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") return json(res, 405, { success: false, error: "method_not_allowed" });
  try {
    if (!stripeConfig.enabled) return json(res, 503, { success: false, error: "stripe_not_configured" });

    const body = parseJson(await readBody(req));
    const userId = String(body.userId || "").trim();
    const userEmail = String(body.userEmail || "").trim().toLowerCase();
    const productType = String(body.productType || "").trim();
    const product = stripeProduct(productType);

    if (!userId || !userEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)) {
      return json(res, 401, { success: false, error: "auth_required" });
    }
    if (!product) return json(res, 400, { success: false, error: "invalid_product" });
    if (!product.priceId) return json(res, 503, { success: false, error: "stripe_price_not_configured" });
    if (product.mode === "payment" && !stripeConfig.oneTimePaymentsEnabled) return json(res, 403, { success: false, error: "one_time_payments_disabled" });
    if (product.mode === "subscription" && !stripeConfig.subscriptionsEnabled) return json(res, 403, { success: false, error: "subscriptions_disabled" });

    const successUrl = checkoutUrlWithSessionId(cleanUrl(body.successUrl, process.env.STRIPE_SUCCESS_URL));
    const cancelUrl = cleanUrl(body.cancelUrl, process.env.STRIPE_CANCEL_URL);
    if (!successUrl || !cancelUrl) return json(res, 503, { success: false, error: "stripe_redirect_urls_not_configured" });

    const metadata = {
      userId,
      userEmail,
      productType,
      planType: product.planType || "",
      resumeId: String(body.resumeId || body.productId || "").trim(),
      templateId: String(body.templateId || "").trim(),
      creditsAmount: String(product.creditsAmount || body.quantity || 0),
      source: "succeedora",
      paymentProvider: "stripe",
    };

    const params = new URLSearchParams();
    appendParam(params, "mode", product.mode);
    appendParam(params, "success_url", successUrl);
    appendParam(params, "cancel_url", cancelUrl);
    appendParam(params, "client_reference_id", userId);
    appendParam(params, "customer_email", userEmail);
    appendParam(params, "payment_method_types[0]", "card");
    appendParam(params, "line_items[0][price]", product.priceId);
    appendParam(params, "line_items[0][quantity]", Math.max(1, Number(body.quantity || 1)));
    Object.entries(metadata).forEach(([key, value]) => appendParam(params, `metadata[${key}]`, value));
    if (product.mode === "payment") {
      appendMetadata(params, "payment_intent_data", metadata);
      appendParam(params, "customer_creation", "if_required");
    }
    if (product.mode === "subscription") {
      appendMetadata(params, "subscription_data", metadata);
    }

    const session = await stripeRequest("/checkout/sessions", params);
    return json(res, 200, { success: true, checkoutUrl: session.url, sessionId: session.id, mode: stripeConfig.mode });
  } catch (error) {
    console.error("[succeedora:stripe:create-checkout-session]", error.message);
    return json(res, error.statusCode || 500, { success: false, error: error.message || "checkout_session_failed" });
  }
};
