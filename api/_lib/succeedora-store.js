async function recordStripeWebhookLog(event, status, details = {}) {
  console.info("[succeedora:stripe:webhook]", JSON.stringify({
    eventId: event?.id || "",
    eventType: event?.type || "",
    status,
    details,
    createdAt: new Date().toISOString(),
  }));
}

async function findStripeCustomerForUser(userId) {
  await recordStripeWebhookLog({ type: "customer.lookup" }, "not_applied", {
    reason: "server_persistent_store_not_configured",
    userId: userId || "",
  });
  return null;
}

async function grantStripeOneTimeEntitlement(metadata, stripeData) {
  await recordStripeWebhookLog({ id: stripeData.eventId, type: "entitlement.one_time" }, "not_applied", {
    reason: "server_persistent_store_not_configured",
    userId: metadata.userId || "",
    productType: metadata.productType || "",
    stripeSessionId: stripeData.stripeSessionId || "",
  });
  return { applied: false, reason: "server_persistent_store_not_configured" };
}

async function activateStripeSubscription(metadata, stripeData) {
  await recordStripeWebhookLog({ id: stripeData.eventId, type: "entitlement.subscription" }, "not_applied", {
    reason: "server_persistent_store_not_configured",
    userId: metadata.userId || "",
    planType: metadata.planType || "",
    stripeSubscriptionId: stripeData.stripeSubscriptionId || "",
  });
  return { applied: false, reason: "server_persistent_store_not_configured" };
}

async function markStripeSubscriptionCancelled(metadata, stripeData) {
  await recordStripeWebhookLog({ id: stripeData.eventId, type: "subscription.cancelled" }, "not_applied", {
    reason: "server_persistent_store_not_configured",
    userId: metadata.userId || "",
    stripeSubscriptionId: stripeData.stripeSubscriptionId || "",
  });
  return { applied: false, reason: "server_persistent_store_not_configured" };
}

async function markStripePaymentFailed(metadata, stripeData) {
  await recordStripeWebhookLog({ id: stripeData.eventId, type: "payment.failed" }, "logged", {
    userId: metadata.userId || "",
    stripeSubscriptionId: stripeData.stripeSubscriptionId || "",
  });
  return { applied: true };
}

module.exports = {
  recordStripeWebhookLog,
  findStripeCustomerForUser,
  grantStripeOneTimeEntitlement,
  activateStripeSubscription,
  markStripeSubscriptionCancelled,
  markStripePaymentFailed,
};
