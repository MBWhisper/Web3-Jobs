import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const stripe = stripeSecretKey ? new Stripe(stripeSecretKey) : null;

async function getRawBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!stripe || !stripeWebhookSecret) {
    return res.status(500).json({
      error: 'Missing STRIPE_SECRET_KEY or STRIPE_WEBHOOK_SECRET on server.',
    });
  }

  const signature = req.headers['stripe-signature'];
  if (!signature) {
    return res.status(400).json({ error: 'Missing stripe-signature header.' });
  }

  let event;
  try {
    const rawBody = await getRawBody(req);
    event = stripe.webhooks.constructEvent(rawBody, signature, stripeWebhookSecret);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Invalid webhook signature';
    return res.status(400).json({ error: message });
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      console.log('checkout.session.completed', {
        id: session.id,
        customer_email: session.customer_email,
        amount_total: session.amount_total,
        currency: session.currency,
        metadata: session.metadata,
      });
    }

    if (event.type === 'checkout.session.async_payment_failed') {
      const session = event.data.object;
      console.log('checkout.session.async_payment_failed', {
        id: session.id,
        customer_email: session.customer_email,
      });
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Webhook processing failed';
    return res.status(500).json({ error: message });
  }
}
