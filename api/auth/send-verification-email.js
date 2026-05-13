const RESEND_EMAILS_ENDPOINT = "https://api.resend.com/emails";

function json(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload));
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function validEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizeEmail(email));
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function parseBody(req) {
  if (req.body && typeof req.body === "object") return Promise.resolve(req.body);
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1024 * 20) {
        reject(new Error("payload_too_large"));
        req.destroy();
      }
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(new Error("invalid_json"));
      }
    });
    req.on("error", reject);
  });
}

function verificationEmail({ name, code, language, appUrl }) {
  const isPt = language === "pt";
  const safeName = escapeHtml(name || "Succeedora");
  const safeCode = escapeHtml(code);
  const title = isPt ? "Confirme seu e-mail na Succeedora" : "Confirm your Succeedora email";
  const intro = isPt
    ? `Ola, ${safeName}. Use o codigo abaixo para confirmar seu e-mail.`
    : `Hi, ${safeName}. Use the code below to confirm your email.`;
  const expires = isPt ? "Este codigo expira em 10 minutos." : "This code expires in 10 minutes.";
  const ignore = isPt
    ? "Se voce nao criou uma conta na Succeedora, ignore este e-mail."
    : "If you did not create a Succeedora account, you can ignore this email.";
  const html = `
    <div style="margin:0;padding:32px;background:#f6f8ff;font-family:Inter,Arial,sans-serif;color:#172033">
      <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #dfe7fb;border-radius:18px;padding:32px;box-shadow:0 20px 60px rgba(23,32,51,.08)">
        <p style="margin:0 0 12px;color:#3156d4;font-weight:700;letter-spacing:.04em;text-transform:uppercase;font-size:12px">Succeedora</p>
        <h1 style="margin:0 0 16px;font-size:26px;line-height:1.2;color:#111827">${title}</h1>
        <p style="margin:0 0 24px;font-size:16px;line-height:1.6;color:#4b5563">${intro}</p>
        <div style="margin:0 0 24px;padding:18px 22px;border-radius:14px;background:#eef4ff;border:1px solid #cddcff;text-align:center;font-size:34px;letter-spacing:8px;font-weight:800;color:#233bd2">${safeCode}</div>
        <p style="margin:0 0 8px;font-size:14px;line-height:1.6;color:#4b5563">${expires}</p>
        <p style="margin:0;font-size:13px;line-height:1.6;color:#6b7280">${ignore}</p>
        <p style="margin:24px 0 0;font-size:12px;color:#94a3b8">${escapeHtml(appUrl)}</p>
      </div>
    </div>
  `;
  const text = `${title}\n\n${intro}\n\n${code}\n\n${expires}\n${ignore}\n${appUrl}`;
  return { subject: title, html, text };
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return json(res, 405, { ok: false, error: "method_not_allowed" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || "contato@succeedora.com";
  const fromName = process.env.RESEND_FROM_NAME || "Succeedora";
  const appUrl = process.env.APP_URL || "https://succeedora.com";

  if (!apiKey) return json(res, 500, { ok: false, error: "missing_resend_api_key" });

  let body;
  try {
    body = await parseBody(req);
  } catch (error) {
    return json(res, 400, { ok: false, error: error.message || "invalid_body" });
  }

  const email = normalizeEmail(body.email);
  const name = String(body.name || "").trim().slice(0, 120);
  const code = String(body.code || "").trim();
  const language = body.language === "pt" ? "pt" : "en";

  if (!validEmail(email) || !name || !/^\d{6}$/.test(code)) {
    return json(res, 400, { ok: false, error: "invalid_fields" });
  }

  const message = verificationEmail({ name, code, language, appUrl });
  const response = await fetch(RESEND_EMAILS_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `${fromName} <${fromEmail}>`,
      to: [email],
      subject: message.subject,
      html: message.html,
      text: message.text,
      tags: [{ name: "category", value: "email_verification" }],
    }),
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    return json(res, response.status || 502, { ok: false, error: "resend_error", details: payload });
  }

  return json(res, 200, { ok: true, id: payload.id || "" });
};
