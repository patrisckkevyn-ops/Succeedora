const crypto = require("crypto");

const TURNSTILE_SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

function isProductionRuntime() {
  return process.env.VERCEL_ENV === "production" || process.env.NODE_ENV === "production";
}

function turnstileSiteKey() {
  return String(process.env.CLOUDFLARE_TURNSTILE_SITE_KEY || "").trim();
}

function turnstileSecretKey() {
  return String(process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY || "").trim();
}

function turnstileConfigured() {
  return Boolean(turnstileSiteKey() && turnstileSecretKey());
}

function getRemoteIp(req) {
  const forwarded = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim();
  return String(req.headers["cf-connecting-ip"] || forwarded || req.headers["x-real-ip"] || req.socket?.remoteAddress || "").trim();
}

async function verifyTurnstileToken(token, remoteIp = "") {
  const secret = turnstileSecretKey();
  const siteKey = turnstileSiteKey();
  const responseToken = String(token || "").trim();
  const production = isProductionRuntime();

  if (!secret || !siteKey) {
    return production
      ? { success: false, error: "turnstile_not_configured" }
      : { success: true, bypass: true, error: "" };
  }

  if (!responseToken) {
    return { success: false, error: "missing_token" };
  }

  const body = new URLSearchParams();
  body.set("secret", secret);
  body.set("response", responseToken);
  if (remoteIp) body.set("remoteip", remoteIp);
  body.set("idempotency_key", crypto.randomUUID ? crypto.randomUUID() : crypto.randomBytes(16).toString("hex"));

  try {
    const controller = typeof AbortController === "undefined" ? null : new AbortController();
    const timeout = controller ? setTimeout(() => controller.abort(), 9000) : null;
    const response = await fetch(TURNSTILE_SITEVERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      signal: controller?.signal,
    });
    if (timeout) clearTimeout(timeout);
    const payload = await response.json().catch(() => ({}));
    return {
      success: Boolean(response.ok && payload.success),
      error: Array.isArray(payload["error-codes"]) ? payload["error-codes"].join(",") : "",
      payload,
    };
  } catch (error) {
    return { success: false, error: error?.name === "AbortError" ? "timeout" : "verification_failed" };
  }
}

module.exports = {
  getRemoteIp,
  isProductionRuntime,
  turnstileConfigured,
  turnstileSiteKey,
  verifyTurnstileToken,
};
