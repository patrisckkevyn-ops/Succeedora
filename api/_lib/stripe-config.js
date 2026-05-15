const ONE_TIME_PRODUCTS = {
  remove_watermark: { envBase: "STRIPE_REMOVE_WATERMARK_PRICE_ID", creditsAmount: 0 },
  premium_pdf: { envBase: "STRIPE_PREMIUM_PDF_PRICE_ID", creditsAmount: 0 },
  premium_template: { envBase: "STRIPE_PREMIUM_TEMPLATE_PRICE_ID", creditsAmount: 0 },
  career_pack: { envBase: "STRIPE_CAREER_PACK_PRICE_ID", creditsAmount: 0 },
  ai_credits: { envBase: "STRIPE_AI_CREDITS_STARTER_PRICE_ID", fallbackEnv: "STRIPE_AI_CREDITS_PRICE_ID", creditsAmount: 10 },
  ai_credits_starter: { envBase: "STRIPE_AI_CREDITS_STARTER_PRICE_ID", creditsAmount: 10 },
  ai_credits_growth: { envBase: "STRIPE_AI_CREDITS_GROWTH_PRICE_ID", creditsAmount: 30 },
  ai_credits_power: { envBase: "STRIPE_AI_CREDITS_POWER_PRICE_ID", creditsAmount: 75 },
  online_resume_link: { envBase: "STRIPE_ONLINE_RESUME_LINK_PRICE_ID", creditsAmount: 0 },
};

const SUBSCRIPTION_PRODUCTS = {
  plan_pro: { envBase: "STRIPE_PRO_PRICE_ID", planType: "pro" },
  plan_premium: { envBase: "STRIPE_PREMIUM_PRICE_ID", planType: "premium" },
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

function normalizeCurrency(value) {
  const currency = String(value || "").trim().toUpperCase();
  return currency === "USD" ? "USD" : "BRL";
}

function envPriceId(envBase, currency, fallbackEnv = "") {
  const normalized = normalizeCurrency(currency);
  const suffixed = `${envBase}_${normalized}`;
  const fallbacks = normalized === "BRL" ? [envBase, fallbackEnv] : [];
  return [suffixed, ...fallbacks]
    .filter(Boolean)
    .map((key) => String(process.env[key] || "").trim())
    .find(Boolean) || "";
}

function stripeProduct(productType, currency = "BRL") {
  const normalizedCurrency = normalizeCurrency(currency);
  if (ONE_TIME_PRODUCTS[productType]) {
    const product = ONE_TIME_PRODUCTS[productType];
    return {
      productType,
      mode: "payment",
      currency: normalizedCurrency,
      priceId: envPriceId(product.envBase, normalizedCurrency, product.fallbackEnv),
      planType: "",
      creditsAmount: product.creditsAmount,
    };
  }
  if (SUBSCRIPTION_PRODUCTS[productType]) {
    const product = SUBSCRIPTION_PRODUCTS[productType];
    return {
      productType,
      mode: "subscription",
      currency: normalizedCurrency,
      priceId: envPriceId(product.envBase, normalizedCurrency),
      planType: product.planType,
      creditsAmount: 0,
    };
  }
  return null;
}

module.exports = { stripeConfig, stripeProduct, normalizeCurrency, ONE_TIME_PRODUCTS, SUBSCRIPTION_PRODUCTS };
