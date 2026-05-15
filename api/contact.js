const { json, parseJson, readBody } = require("./_lib/http");
const { getRemoteIp, verifyTurnstileToken } = require("./_lib/turnstile");

function validEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || "").trim());
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return json(res, 405, { ok: false, error: "method_not_allowed" });
  }

  try {
    const payload = parseJson(await readBody(req, 128 * 1024));
    const turnstile = await verifyTurnstileToken(payload.turnstileToken || payload.token, getRemoteIp(req));
    if (!turnstile.success) return json(res, 403, { ok: false, error: "turnstile_failed" });

    const name = String(payload.name || "").trim();
    const email = String(payload.email || "").trim();
    const subject = String(payload.subject || "").trim();
    const message = String(payload.message || "").trim();
    if (name.length < 2 || !validEmail(email) || subject.length < 3 || message.length < 10) {
      return json(res, 400, { ok: false, error: "invalid_contact_payload" });
    }

    // Contact delivery can be wired to Resend/KV later; Turnstile validation already happens server-side.
    return json(res, 200, { ok: true });
  } catch (error) {
    return json(res, 400, { ok: false, error: error.message || "invalid_request" });
  }
};
