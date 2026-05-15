const KV_URL = String(process.env.KV_REST_API_URL || "").replace(/\/$/, "");
const KV_TOKEN = String(process.env.KV_REST_API_TOKEN || "");
const KEY_PREFIX = "succeedora:stripe";
const AI_KEY_PREFIX = "succeedora:ai";

const AI_CREDIT_PACKS = {
  ai_credits: 10,
  ai_credits_starter: 10,
  ai_credits_growth: 30,
  ai_credits_power: 75,
};

const AI_TASK_CREDIT_COSTS = {
  generate_professional_summary: 1,
  improve_professional_summary: 1,
  rewrite_experience: 1,
  suggest_skills: 1,
  improve_project_description: 1,
  generate_cover_letter: 2,
  improve_cover_letter: 1,
  tailor_cover_letter_to_job: 2,
  formal_cover_letter: 1,
  direct_cover_letter: 1,
  confident_cover_letter: 1,
  analyze_resume_ats: 2,
  analyze_job_description: 2,
  suggest_ats_keywords: 1,
  ats_keyword_suggestions: 1,
  translate_resume: 3,
  tailor_resume_to_job: 4,
  recommend_resume_template: 1,
  assistant_chat: 1,
};

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

function aiCreditKey(userId) {
  return `${AI_KEY_PREFIX}:user:${userId}:credits`;
}

function aiCreditTransactionsKey(userId) {
  return `${AI_KEY_PREFIX}:user:${userId}:transactions`;
}

function aiCreditSessionKey(sessionId) {
  return `${AI_KEY_PREFIX}:stripe-session:${sessionId}`;
}

function normalizeEmail(value = "") {
  return String(value || "").trim().toLowerCase();
}

function cleanUserIdentity(user = {}) {
  const userId = String(user.userId || user.id || "").trim();
  const userEmail = normalizeEmail(user.userEmail || user.email || "");
  return { userId, userEmail };
}

function defaultAiCredits() {
  const now = new Date().toISOString();
  return { balance: 0, totalPurchased: 0, totalUsed: 0, updatedAt: now };
}

function normalizeAiCredits(raw = {}) {
  const base = defaultAiCredits();
  const object = raw && typeof raw === "object" ? raw : {};
  return {
    balance: Math.max(0, Number(object.balance || 0)),
    totalPurchased: Math.max(0, Number(object.totalPurchased || 0)),
    totalUsed: Math.max(0, Number(object.totalUsed || 0)),
    updatedAt: object.updatedAt || base.updatedAt,
  };
}

function aiTaskCreditCost(taskType = "") {
  return AI_TASK_CREDIT_COSTS[taskType] || 1;
}

function aiCreditAmountForProduct(productType = "", fallback = 0) {
  return Math.max(0, Number(AI_CREDIT_PACKS[productType] || fallback || 0));
}

function transactionId(prefix = "tx") {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

async function getAiCreditState(user = {}) {
  const { userId } = cleanUserIdentity(user);
  if (!kvConfigured() || !userId) return { configured: kvConfigured(), credits: defaultAiCredits(), transactions: [] };
  const credits = normalizeAiCredits(await kvGetJson(aiCreditKey(userId)));
  const ids = await kvCommand(["LRANGE", aiCreditTransactionsKey(userId), 0, 99]).catch(() => []);
  const transactions = Array.isArray(ids)
    ? ids.map((item) => {
        try {
          return typeof item === "string" ? JSON.parse(item) : item;
        } catch (error) {
          return null;
        }
      }).filter(Boolean)
    : [];
  return { configured: true, credits, transactions };
}

async function persistAiCreditTransaction(user, transaction, credits) {
  if (!kvConfigured() || !user.userId) return;
  const entry = {
    id: transaction.id || transactionId("credit"),
    userId: user.userId,
    userEmail: user.userEmail || "",
    type: transaction.type || "usage",
    amount: Number(transaction.amount || 0),
    balanceAfter: Number(credits.balance || 0),
    taskType: transaction.taskType || "",
    productType: transaction.productType || "",
    paymentId: transaction.paymentId || "",
    stripeSessionId: transaction.stripeSessionId || "",
    reason: transaction.reason || "",
    createdAt: transaction.createdAt || new Date().toISOString(),
  };
  await kvCommand(["LPUSH", aiCreditTransactionsKey(user.userId), JSON.stringify(entry)]).catch(() => null);
  await kvCommand(["LTRIM", aiCreditTransactionsKey(user.userId), 0, 499]).catch(() => null);
}

async function adjustAiCredits(userInput = {}, amount = 0, transaction = {}) {
  const user = cleanUserIdentity(userInput);
  const delta = Number(amount || 0);
  if (!kvConfigured()) return { applied: false, reason: "server_persistent_store_not_configured" };
  if (!user.userId || !user.userEmail) return { applied: false, reason: "auth_required" };
  if (!Number.isFinite(delta) || delta === 0) return { applied: false, reason: "invalid_credit_amount" };

  const current = normalizeAiCredits(await kvGetJson(aiCreditKey(user.userId)));
  const next = {
    ...current,
    balance: Math.max(0, current.balance + delta),
    totalPurchased: delta > 0 && ["purchase", "admin_add"].includes(transaction.type) ? current.totalPurchased + delta : current.totalPurchased,
    totalUsed: delta < 0 && ["usage", "admin_remove"].includes(transaction.type) ? current.totalUsed + Math.abs(delta) : current.totalUsed,
    updatedAt: new Date().toISOString(),
  };
  if (delta < 0 && current.balance + delta < 0) return { applied: false, reason: "insufficient_credits", credits: current };
  await kvSetJson(aiCreditKey(user.userId), next);
  await persistAiCreditTransaction(user, { ...transaction, amount: delta }, next);
  return { applied: true, credits: next };
}

async function grantAiCreditsForStripePayment(record = {}) {
  const user = cleanUserIdentity({ userId: record.userId, userEmail: record.userEmail });
  const productType = record.productType || "";
  const amount = aiCreditAmountForProduct(productType, record.creditsAmount);
  const sessionId = record.stripeSessionId || "";
  if (!amount) return { applied: false, reason: "not_ai_credits_product" };
  if (!kvConfigured()) return { applied: false, reason: "server_persistent_store_not_configured" };
  if (!sessionId) return { applied: false, reason: "missing_stripe_session_id" };
  const claimed = await kvCommand(["SET", aiCreditSessionKey(sessionId), new Date().toISOString(), "NX", "EX", 60 * 60 * 24 * 365]);
  if (claimed !== "OK") return { applied: false, reason: "duplicate_stripe_session" };
  return adjustAiCredits(user, amount, {
    type: "purchase",
    productType,
    paymentId: record.stripePaymentIntentId || sessionId,
    stripeSessionId: sessionId,
    reason: `Stripe ${productType}`,
  });
}

async function reserveAiCreditsForTask(userInput = {}, taskType = "") {
  const user = cleanUserIdentity(userInput);
  const cost = aiTaskCreditCost(taskType);
  const result = await adjustAiCredits(user, -cost, {
    type: "usage",
    taskType,
    reason: "AI usage",
  });
  return { ...result, cost };
}

async function refundAiCreditsForTask(userInput = {}, taskType = "", amount = aiTaskCreditCost(taskType), reason = "AI generation failed") {
  return adjustAiCredits(userInput, Math.max(0, Number(amount || 0)), {
    type: "refund",
    taskType,
    reason,
  });
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
  const payment = await persistPayment(record);
  const credits = await grantAiCreditsForStripePayment(record);
  return { ...payment, credits };
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
  AI_CREDIT_PACKS,
  AI_TASK_CREDIT_COSTS,
  aiTaskCreditCost,
  getAiCreditState,
  adjustAiCredits,
  reserveAiCreditsForTask,
  refundAiCreditsForTask,
  grantAiCreditsForStripePayment,
  recordStripeWebhookLog,
  findStripeCustomerForUser,
  grantStripeOneTimeEntitlement,
  activateStripeSubscription,
  markStripeSubscriptionCancelled,
  markStripePaymentFailed,
  findWebhookPaymentBySession,
};
