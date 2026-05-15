const { json } = require("../_lib/http");
const { getAiCreditState } = require("../_lib/succeedora-store");

function requestUrl(req) {
  return new URL(req.url || "/api/ai/credits", `https://${req.headers.host || "succeedora.com"}`);
}

module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return json(res, 405, { success: false, error: "method_not_allowed" });
  }
  try {
    const url = requestUrl(req);
    const userId = String(url.searchParams.get("userId") || "").trim();
    const userEmail = String(url.searchParams.get("userEmail") || "").trim().toLowerCase();
    if (!userId || !userEmail) return json(res, 401, { success: false, error: "auth_required" });
    const state = await getAiCreditState({ userId, userEmail });
    if (!state.configured) return json(res, 503, { success: false, error: "server_persistent_store_not_configured" });
    return json(res, 200, {
      success: true,
      aiCredits: state.credits,
      transactions: state.transactions,
    });
  } catch (error) {
    return json(res, 500, { success: false, error: "credits_lookup_failed" });
  }
};
