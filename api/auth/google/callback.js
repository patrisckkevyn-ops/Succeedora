const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_USERINFO_URL = "https://openidconnect.googleapis.com/v1/userinfo";
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

function parseCookies(req) {
  return String(req.headers.cookie || "").split(";").reduce((acc, item) => {
    const index = item.indexOf("=");
    if (index > -1) acc[item.slice(0, index).trim()] = decodeURIComponent(item.slice(index + 1).trim());
    return acc;
  }, {});
}

function readStateCookie(req) {
  const raw = parseCookies(req)[STATE_COOKIE];
  if (!raw) return null;
  try {
    const payload = JSON.parse(Buffer.from(raw, "base64url").toString("utf8"));
    if (!payload?.state || Date.now() - Number(payload.createdAt || 0) > 10 * 60 * 1000) return null;
    return payload;
  } catch (error) {
    return null;
  }
}

function clearStateCookie(req, res) {
  const secure = baseUrl(req).startsWith("https://") ? "; Secure" : "";
  res.setHeader("Set-Cookie", `${STATE_COOKIE}=; Path=/api/auth/google; HttpOnly; SameSite=Lax; Max-Age=0${secure}`);
}

function safeReturnTo(value) {
  const text = String(value || "").trim();
  if (!text || text.length > 180) return "/dashboard";
  if (!/^\/[a-z0-9/_-]*(\?[a-z0-9=&%._-]*)?$/i.test(text)) return "/dashboard";
  if (text.startsWith("/api/")) return "/dashboard";
  return text;
}

function renderBridge(res, payload) {
  const safePayload = JSON.stringify(payload).replace(/</g, "\\u003c");
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.end(`<!doctype html>
<html lang="en">
  <head><meta charset="utf-8"><meta name="robots" content="noindex"><title>Succeedora Google Login</title></head>
  <body>
    <script>
      try {
        localStorage.setItem("succeedora.googleOAuthResult", JSON.stringify(${safePayload}));
      } catch (error) {}
      location.replace("/#/auth/google/callback");
    </script>
  </body>
</html>`);
}

async function exchangeCodeForToken({ code, req, clientId, clientSecret }) {
  const body = new URLSearchParams();
  body.set("code", code);
  body.set("client_id", clientId);
  body.set("client_secret", clientSecret);
  body.set("redirect_uri", redirectUri(req));
  body.set("grant_type", "authorization_code");
  const response = await fetch(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || !payload.access_token) throw new Error(payload.error || "token_exchange_failed");
  return payload.access_token;
}

async function fetchGoogleProfile(accessToken) {
  const response = await fetch(GOOGLE_USERINFO_URL, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || !payload.sub || !payload.email) throw new Error("profile_fetch_failed");
  return {
    googleId: String(payload.sub || ""),
    name: String(payload.name || ""),
    email: String(payload.email || "").trim().toLowerCase(),
    picture: String(payload.picture || ""),
    emailVerified: payload.email_verified === true || payload.email_verified === "true",
  };
}

module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return json(res, 405, { ok: false, error: "method_not_allowed" });
  }

  const requestUrl = new URL(req.url || "/api/auth/google/callback", baseUrl(req));
  const stateCookie = readStateCookie(req);
  clearStateCookie(req, res);
  const returnTo = safeReturnTo(stateCookie?.returnTo);
  const language = stateCookie?.language === "pt" ? "pt" : "en";

  try {
    if (requestUrl.searchParams.get("error")) throw new Error(requestUrl.searchParams.get("error") || "oauth_cancelled");
    const state = requestUrl.searchParams.get("state") || "";
    const code = requestUrl.searchParams.get("code") || "";
    if (!stateCookie?.state || !state || state !== stateCookie.state) throw new Error("invalid_state");
    if (!code) throw new Error("missing_code");

    const clientId = String(process.env.GOOGLE_CLIENT_ID || "").trim();
    const clientSecret = String(process.env.GOOGLE_CLIENT_SECRET || "").trim();
    if (!clientId || !clientSecret) throw new Error("missing_google_oauth_config");

    const accessToken = await exchangeCodeForToken({ code, req, clientId, clientSecret });
    const profile = await fetchGoogleProfile(accessToken);
    return renderBridge(res, { ok: true, provider: "google", profile, returnTo, language });
  } catch (error) {
    return renderBridge(res, { ok: false, provider: "google", error: error.message || "google_oauth_failed", returnTo, language });
  }
};
