const STRIPE_API_BASE = "https://api.stripe.com/v1";

function appendParam(params, key, value) {
  if (value === undefined || value === null || value === "") return;
  params.append(key, String(value));
}

function appendMetadata(params, prefix, metadata = {}) {
  Object.entries(metadata).forEach(([key, value]) => appendParam(params, `${prefix}[metadata][${key}]`, value));
}

async function stripeRequest(path, params) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    const error = new Error("stripe_not_configured");
    error.statusCode = 503;
    throw error;
  }
  const response = await fetch(`${STRIPE_API_BASE}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secretKey}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(payload?.error?.message || "stripe_request_failed");
    error.statusCode = response.status;
    error.stripeType = payload?.error?.type || "";
    throw error;
  }
  return payload;
}

async function stripeGet(path, query = {}) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    const error = new Error("stripe_not_configured");
    error.statusCode = 503;
    throw error;
  }
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => appendParam(params, key, value));
  const suffix = params.toString() ? `?${params}` : "";
  const response = await fetch(`${STRIPE_API_BASE}${path}${suffix}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${secretKey}` },
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(payload?.error?.message || "stripe_request_failed");
    error.statusCode = response.status;
    error.stripeType = payload?.error?.type || "";
    throw error;
  }
  return payload;
}

module.exports = { appendParam, appendMetadata, stripeRequest, stripeGet };
