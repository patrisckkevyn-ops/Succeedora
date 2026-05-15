const crypto = require("crypto");

const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_SCOPES = ["openid", "email", "profile"];
const STATE_COOKIE = "succeedora_google_oauth_state";

function json(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload));
}

function baseUrl(req) {
  const proto = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers["x-forwarded-host"] || req.headers.host || "succeedora.com";
  return `${proto}://${host}`;
}

function redirectUri(req) {
  return process.env.GOOGLE_REDIRECT_URI || `${baseUrl(req)}/api/auth/google/callback`;
}

function safeReturnTo(value) {
  const text = String(value || "").trim();
  if (!text || text.length > 180) return "/dashboard";
  if (!/^\/[a-z0-9/_-]*(\?[a-z0-9=&%._-]*)?$/i.test(text)) return "/dashboard";
  if (text.startsWith("/api/")) return "/dashboard";
  return text;
}

function cookieValue(state, returnTo, language) {
  return Buffer.from(JSON.stringify({ state, returnTo, language, createdAt: Date.now() })).toString("base64url");
}

module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return json(res, 405, { ok: false, error: "method_not_allowed" });
  }

  const clientId = String(process.env.GOOGLE_CLIENT_ID || "").trim();
  if (!clientId) return json(res, 500, { ok: false, error: "missing_google_client_id" });

  const requestUrl = new URL(req.url || "/api/auth/google/start", baseUrl(req));
  const state = crypto.randomBytes(32).toString("base64url");
  const returnTo = safeReturnTo(requestUrl.searchParams.get("returnTo"));
  const language = requestUrl.searchParams.get("lang") === "pt" ? "pt" : "en";
  const secure = baseUrl(req).startsWith("https://") ? "; Secure" : "";
  res.setHeader("Set-Cookie", `${STATE_COOKIE}=${cookieValue(state, returnTo, language)}; Path=/api/auth/google; HttpOnly; SameSite=Lax; Max-Age=600${secure}`);

  const authUrl = new URL(GOOGLE_AUTH_URL);
  authUrl.searchParams.set("client_id", clientId);
  authUrl.searchParams.set("redirect_uri", redirectUri(req));
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("scope", GOOGLE_SCOPES.join(" "));
  authUrl.searchParams.set("state", state);
  authUrl.searchParams.set("access_type", "online");
  authUrl.searchParams.set("prompt", "select_account");

  res.statusCode = 302;
  res.setHeader("Location", authUrl.toString());
  res.end();
};
