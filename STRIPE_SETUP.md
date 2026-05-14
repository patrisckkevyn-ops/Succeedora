# Succeedora Stripe Setup

This project can create the Stripe products and prices with a local script.

Do not paste Stripe secret keys into chat, GitHub, HTML, CSS, or frontend JavaScript.

## 1. Add your local secret key

Create a local `.env.local` file. It is ignored by Git.

```env
STRIPE_SECRET_KEY=sk_live_your_key_here
```

Use `sk_live_...` for public production payments. Use `sk_test_...` only when you intentionally want Stripe test mode.

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

At the end, it prints the `STRIPE_*_PRICE_ID` values to add in Vercel.

## 3. Add variables in Vercel

In Vercel, open Project > Settings > Environment Variables and add:

```env
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRO_PRICE_ID=
STRIPE_PREMIUM_PRICE_ID=
STRIPE_REMOVE_WATERMARK_PRICE_ID=
STRIPE_PREMIUM_PDF_PRICE_ID=
STRIPE_PREMIUM_TEMPLATE_PRICE_ID=
STRIPE_CAREER_PACK_PRICE_ID=
STRIPE_ONLINE_RESUME_LINK_PRICE_ID=
STRIPE_AI_CREDITS_STARTER_PRICE_ID=
STRIPE_AI_CREDITS_GROWTH_PRICE_ID=
STRIPE_AI_CREDITS_POWER_PRICE_ID=
STRIPE_SUCCESS_URL=https://succeedora.com/#/payment/success?session_id={CHECKOUT_SESSION_ID}
STRIPE_CANCEL_URL=https://succeedora.com/#/payment/cancel
```

Then redeploy the project.

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

Checkout creation is ready after the environment variables are set. The current webhook store logs events, but it does not yet persist paid entitlements to a server database.
