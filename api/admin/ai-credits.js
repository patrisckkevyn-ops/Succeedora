const { json, readBody, parseJson } = require("../_lib/http");
const { adjustAiCredits, getAiCreditState } = require("../_lib/succeedora-store");

const ADMIN_EMAILS = ["patrisckkevyn@gmail.com"];

function isAdmin(email = "") {
  return ADMIN_EMAILS.includes(String(email || "").trim().toLowerCase());
}

module.exports = async function handler(req, res) {
  if (!["GET", "POST"].includes(req.method)) {
    res.setHeader("Allow", "GET, POST");
    return json(res, 405, { success: false, error: "method_not_allowed" });
  }
  try {
    if (req.method === "GET") {
      const url = new URL(req.url || "/api/admin/ai-credits", `https://${req.headers.host || "succeedora.com"}`);
      const adminEmail = String(url.searchParams.get("adminEmail") || "").trim().toLowerCase();
      const userId = String(url.searchParams.get("userId") || "").trim();
      const userEmail = String(url.searchParams.get("userEmail") || "").trim().toLowerCase();
      if (!isAdmin(adminEmail)) return json(res, 403, { success: false, error: "admin_required" });
      const state = await getAiCreditState({ userId, userEmail });
      return json(res, 200, { success: true, aiCredits: state.credits, transactions: state.transactions });
    }

    const body = parseJson(await readBody(req));
    const adminEmail = String(body.adminEmail || "").trim().toLowerCase();
    const userId = String(body.userId || "").trim();
    const userEmail = String(body.userEmail || "").trim().toLowerCase();
    const amount = Math.trunc(Number(body.amount || 0));
    const reason = String(body.reason || "").slice(0, 180);
    if (!isAdmin(adminEmail)) return json(res, 403, { success: false, error: "admin_required" });
    if (!userId || !userEmail || !amount) return json(res, 400, { success: false, error: "invalid_credit_request" });
    const result = await adjustAiCredits({ userId, userEmail }, amount, {
      type: amount > 0 ? "admin_add" : "admin_remove",
      reason,
    });
    const state = result.applied ? await getAiCreditState({ userId, userEmail }) : null;
    return json(res, result.applied ? 200 : 400, {
      success: result.applied,
      error: result.applied ? "" : result.reason,
      aiCredits: state?.credits || result.credits,
      transactions: state?.transactions || [],
    });
  } catch (error) {
    return json(res, 500, { success: false, error: "admin_credit_update_failed" });
  }
};
