const { json } = require("../_lib/http");
const { isProductionRuntime, turnstileSiteKey } = require("../_lib/turnstile");

module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return json(res, 405, { ok: false, error: "method_not_allowed" });
  }

  const siteKey = turnstileSiteKey();
  return json(res, 200, {
    ok: true,
    enabled: Boolean(siteKey),
    required: isProductionRuntime(),
    siteKey,
  });
};
