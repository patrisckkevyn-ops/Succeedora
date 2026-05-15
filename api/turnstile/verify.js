const { json, parseJson, readBody } = require("../_lib/http");
const { getRemoteIp, verifyTurnstileToken } = require("../_lib/turnstile");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return json(res, 405, { ok: false, error: "method_not_allowed" });
  }

  try {
    const payload = parseJson(await readBody(req, 64 * 1024));
    const result = await verifyTurnstileToken(payload.token || payload.turnstileToken, getRemoteIp(req));
    if (!result.success) return json(res, 403, { ok: false, error: result.error || "turnstile_failed" });
    return json(res, 200, { ok: true, bypass: Boolean(result.bypass) });
  } catch (error) {
    return json(res, 400, { ok: false, error: error.message || "invalid_request" });
  }
};
