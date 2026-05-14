const fs = require("fs");
const path = require("path");

const STRIPE_API_BASE = "https://api.stripe.com/v1";
const ENV_FILE = path.join(process.cwd(), ".env.local");

function loadLocalEnv() {
  if (!fs.existsSync(ENV_FILE)) return;
  const content = fs.readFileSync(ENV_FILE, "utf8");
  content.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) return;
    const index = trimmed.indexOf("=");
    const key = trimmed.slice(0, index).trim();
    const value = trimmed.slice(index + 1).trim().replace(/^["']|["']$/g, "");
    if (key && process.env[key] === undefined) process.env[key] = value;
  });
}

function append(params, key, value) {
  if (value === undefined || value === null || value === "") return;
  params.append(key, String(value));
}

async function stripeRequest(pathname, params, idempotencyKey) {
  const response = await fetch(`${STRIPE_API_BASE}${pathname}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded",
      "Idempotency-Key": idempotencyKey,
    },
    body: params,
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = payload?.error?.message || `Stripe request failed with HTTP ${response.status}`;
    throw new Error(message);
  }
  return payload;
}

const products = [
  {
    key: "plan_pro",
    env: "STRIPE_PRO_PRICE_ID",
    name: "Succeedora Pro",
    description: "Monthly Pro subscription.",
    amount: 5900,
    mode: "subscription",
  },
  {
    key: "plan_premium",
    env: "STRIPE_PREMIUM_PRICE_ID",
    name: "Succeedora Premium",
    description: "Monthly Premium subscription.",
    amount: 9900,
    mode: "subscription",
  },
  {
    key: "remove_watermark",
    env: "STRIPE_REMOVE_WATERMARK_PRICE_ID",
    name: "Remove watermark",
    description: "Watermark-free PDF for one resume.",
    amount: 790,
    mode: "payment",
  },
  {
    key: "premium_pdf",
    env: "STRIPE_PREMIUM_PDF_PRICE_ID",
    name: "Premium PDF",
    description: "Premium PDF export for one resume.",
    amount: 2900,
    mode: "payment",
  },
  {
    key: "premium_template",
    env: "STRIPE_PREMIUM_TEMPLATE_PRICE_ID",
    name: "Premium template",
    description: "Unlock one premium template.",
    amount: 1900,
    mode: "payment",
  },
  {
    key: "career_pack",
    env: "STRIPE_CAREER_PACK_PRICE_ID",
    name: "Career pack",
    description: "One-time career resource pack.",
    amount: 7900,
    mode: "payment",
  },
  {
    key: "ai_credits_starter",
    env: "STRIPE_AI_CREDITS_STARTER_PRICE_ID",
    name: "AI credits Starter",
    description: "Small one-time AI credits pack.",
    amount: 1900,
    mode: "payment",
  },
  {
    key: "ai_credits_growth",
    env: "STRIPE_AI_CREDITS_GROWTH_PRICE_ID",
    name: "AI credits Growth",
    description: "Medium one-time AI credits pack.",
    amount: 4900,
    mode: "payment",
  },
  {
    key: "ai_credits_power",
    env: "STRIPE_AI_CREDITS_POWER_PRICE_ID",
    name: "AI credits Power",
    description: "Large one-time AI credits pack.",
    amount: 9900,
    mode: "payment",
  },
  {
    key: "online_resume_link",
    env: "STRIPE_ONLINE_RESUME_LINK_PRICE_ID",
    name: "Online resume link",
    description: "Public online resume link.",
    amount: 2400,
    mode: "payment",
  },
];

async function createProduct(item) {
  const params = new URLSearchParams();
  append(params, "name", item.name);
  append(params, "description", item.description);
  append(params, "metadata[source]", "succeedora");
  append(params, "metadata[succeedora_key]", item.key);
  append(params, "metadata[mode]", item.mode);
  return stripeRequest("/products", params, `succeedora-${item.key}-product-v1`);
}

async function createPrice(item, productId) {
  const params = new URLSearchParams();
  append(params, "currency", "brl");
  append(params, "unit_amount", item.amount);
  append(params, "product", productId);
  append(params, "metadata[source]", "succeedora");
  append(params, "metadata[succeedora_key]", item.key);
  append(params, "metadata[mode]", item.mode);
  if (item.mode === "subscription") append(params, "recurring[interval]", "month");
  return stripeRequest("/prices", params, `succeedora-${item.key}-price-${item.amount}-brl-v1`);
}

async function main() {
  loadLocalEnv();
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_SECRET_KEY.startsWith("sk_")) {
    throw new Error("Set STRIPE_SECRET_KEY in .env.local or in your shell before running this script.");
  }

  const output = [];
  for (const item of products) {
    process.stdout.write(`Creating ${item.name}... `);
    const product = await createProduct(item);
    const price = await createPrice(item, product.id);
    output.push([item.env, price.id]);
    process.stdout.write(`${price.id}\n`);
  }

  console.log("\nAdd these variables in Vercel:");
  output.forEach(([env, value]) => console.log(`${env}=${value}`));
  console.log("STRIPE_SUCCESS_URL=https://succeedora.com/#/payment/success?session_id={CHECKOUT_SESSION_ID}");
  console.log("STRIPE_CANCEL_URL=https://succeedora.com/#/payment/cancel");
}

main().catch((error) => {
  console.error(`\nStripe setup failed: ${error.message}`);
  process.exit(1);
});
