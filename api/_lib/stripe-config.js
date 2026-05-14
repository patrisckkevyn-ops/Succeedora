const ONE_TIME_PRODUCTS = {
  remove_watermark: { env: "STRIPE_REMOVE_WATERMARK_PRICE_ID", creditsAmount: 0 },
  premium_pdf: { env: "STRIPE_PREMIUM_PDF_PRICE_ID", creditsAmount: 0 },
  premium_template: { env: "STRIPE_PREMIUM_TEMPLATE_PRICE_ID", creditsAmount: 0 },
  career_pack: { env: "STRIPE_CAREER_PACK_PRICE_ID", creditsAmount: 0 },
  ai_credits: { env: "STRIPE_AI_CREDITS_PRICE_ID", creditsAmount: 10 },
  online_resume_link: { env: "STRIPE_ONLINE_RESUME_LINK_PRICE_ID", creditsAmount: 0 },
};

const SUBSCRIPTION_PRODUCTS = {
  plan_pro: { env: "STRIPE_PRO_PRICE_ID", planType: "pro" },
  plan_premium: { env: "STRIPE_PREMIUM_PRICE_ID", planType: "premium" },
};

const stripeConfig = {
  enabled: Boolean(process.env.STRIPE_SECRET_KEY),
  currency: "brl",
  mode: String(process.env.STRIPE_SECRET_KEY || "").startsWith("sk_live_") ? "live" : "test",
  allowedMethods: ["card"],
  subscriptionsEnabled: true,
  oneTimePaymentsEnabled: true,
  installmentsEnabled: process.env.STRIPE_INSTALLMENTS_ENABLED === "true",
};

function stripeProduct(productType) {
  if (ONE_TIME_PRODUCTS[productType]) {
    const product = ONE_TIME_PRODUCTS[productType];
    return {
      productType,
      mode: "payment",
      priceId: process.env[product.env] || "",
      planType: "",
      creditsAmount: product.creditsAmount,
    };
  }
  if (SUBSCRIPTION_PRODUCTS[productType]) {
    const product = SUBSCRIPTION_PRODUCTS[productType];
    return {
      productType,
      mode: "subscription",
      priceId: process.env[product.env] || "",
      planType: product.planType,
      creditsAmount: 0,
    };
  }
  return null;
}

module.exports = { stripeConfig, stripeProduct, ONE_TIME_PRODUCTS, SUBSCRIPTION_PRODUCTS };
