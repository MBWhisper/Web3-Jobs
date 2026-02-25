import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!stripeSecretKey) {
    return res.status(500).json({ error: 'Missing STRIPE_SECRET_KEY on server.' });
  }

  const { company, email, jobTitle } = req.body ?? {};

  if (!company || !email || !jobTitle) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  try {
    const stripe = new Stripe(stripeSecretKey);
    const origin = req.headers.origin || 'https://web3-jobs-five.vercel.app';

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: email,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'usd',
            unit_amount: 9900,
            product_data: {
              name: 'Paid Web3 Job Listing',
              description: `${company} - ${jobTitle}`,
            },
          },
        },
      ],
      metadata: {
        company,
        email,
        jobTitle,
      },
      success_url: `${origin}/?payment=success`,
      cancel_url: `${origin}/?payment=cancelled`,
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create checkout session';
    return res.status(500).json({ error: message });
  }
}
