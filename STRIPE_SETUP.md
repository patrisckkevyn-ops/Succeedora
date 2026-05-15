# Succeedora Stripe Setup

This project can create the Stripe products and prices with a local script.

Do not paste Stripe secret keys into chat, GitHub, HTML, CSS, or frontend JavaScript.

## 1. Add your local secret key

Create a local `.env.local` file. It is ignored by Git.

```env
STRIPE_SECRET_KEY=
```

Use your live Stripe secret key for public production payments. Use a test secret key only when you intentionally want Stripe test mode.

## 2. Create products and prices

Run:

```powershell
node scripts/create-stripe-products.js
```

The script creates these BRL prices:

- Pro monthly: R$59
- Premium monthly: R$99
- Remove watermark: R$7.90
- Premium PDF: R$29
- Premium template: R$19
- Career pack: R$79
- AI credits Starter: R$19
- AI credits Growth: R$49
- AI credits Power: R$99
- Online resume link: R$24

At the end, it prints the legacy BRL `STRIPE_*_PRICE_ID` values to add in Vercel. For dual-currency production, create the USD prices in Stripe too and configure both the `_BRL` and `_USD` variables below.

## 3. Add variables in Vercel

In Vercel, open Project > Settings > Environment Variables and add:

```env
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
KV_REST_API_URL=
KV_REST_API_TOKEN=
STRIPE_PRO_PRICE_ID=
STRIPE_PREMIUM_PRICE_ID=
STRIPE_PRO_PRICE_ID_BRL=
STRIPE_PRO_PRICE_ID_USD=
STRIPE_PREMIUM_PRICE_ID_BRL=
STRIPE_PREMIUM_PRICE_ID_USD=
STRIPE_REMOVE_WATERMARK_PRICE_ID=
STRIPE_PREMIUM_PDF_PRICE_ID=
STRIPE_PREMIUM_TEMPLATE_PRICE_ID=
STRIPE_CAREER_PACK_PRICE_ID=
STRIPE_ONLINE_RESUME_LINK_PRICE_ID=
STRIPE_AI_CREDITS_STARTER_PRICE_ID=
STRIPE_AI_CREDITS_GROWTH_PRICE_ID=
STRIPE_AI_CREDITS_POWER_PRICE_ID=
STRIPE_REMOVE_WATERMARK_PRICE_ID_BRL=
STRIPE_REMOVE_WATERMARK_PRICE_ID_USD=
STRIPE_PREMIUM_PDF_PRICE_ID_BRL=
STRIPE_PREMIUM_PDF_PRICE_ID_USD=
STRIPE_PREMIUM_TEMPLATE_PRICE_ID_BRL=
STRIPE_PREMIUM_TEMPLATE_PRICE_ID_USD=
STRIPE_CAREER_PACK_PRICE_ID_BRL=
STRIPE_CAREER_PACK_PRICE_ID_USD=
STRIPE_ONLINE_RESUME_LINK_PRICE_ID_BRL=
STRIPE_ONLINE_RESUME_LINK_PRICE_ID_USD=
STRIPE_AI_CREDITS_STARTER_PRICE_ID_BRL=
STRIPE_AI_CREDITS_STARTER_PRICE_ID_USD=
STRIPE_AI_CREDITS_GROWTH_PRICE_ID_BRL=
STRIPE_AI_CREDITS_GROWTH_PRICE_ID_USD=
STRIPE_AI_CREDITS_POWER_PRICE_ID_BRL=
STRIPE_AI_CREDITS_POWER_PRICE_ID_USD=
STRIPE_SUCCESS_URL=https://succeedora.com/#/payment/success?session_id={CHECKOUT_SESSION_ID}
STRIPE_CANCEL_URL=https://succeedora.com/#/payment/cancel
```

Then redeploy the project.

The `_BRL` variables are preferred for BRL checkout. If a `_BRL` variable is missing, the app falls back to the legacy unsuffixed variable for backward compatibility. USD checkout requires the matching `_USD` variable.

## 4. Configure the webhook

In Stripe Dashboard > Developers > Webhooks, add this endpoint:

```text
https://succeedora.com/api/stripe/webhook
```

Recommended events:

- `checkout.session.completed`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.payment_succeeded`
- `invoice.payment_failed`

Copy the signing secret (`whsec_...`) to `STRIPE_WEBHOOK_SECRET` in Vercel.

## Note about automatic unlocks

Stripe unlocks require the webhook plus KV storage. After checkout, the frontend waits for the webhook-confirmed KV record before applying the local entitlement. If `KV_REST_API_URL` or `KV_REST_API_TOKEN` is missing, checkout can still redirect to Stripe, but automatic unlock sync will remain pending.
