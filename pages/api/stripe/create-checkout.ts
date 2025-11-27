/**
 * Stripe Checkout Session API Route
 * Creates a checkout session for Tickk Pro subscription
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

// Initialize Stripe with secret key
const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-02-24.acacia',
    })
  : null;

interface CheckoutRequest {
  priceId: string;
  plan: 'monthly' | 'yearly';
}

interface CheckoutResponse {
  sessionId?: string;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CheckoutResponse>
) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check if Stripe is configured
  if (!stripe) {
    return res.status(500).json({ error: 'Stripe not configured' });
  }

  try {
    const { priceId, plan }: CheckoutRequest = req.body;

    if (!priceId) {
      return res.status(400).json({ error: 'Price ID required' });
    }

    // Get the origin for redirect URLs
    const origin = req.headers.origin || 'https://tickk.app';

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${origin}/pro/success?session_id={CHECKOUT_SESSION_ID}&plan=${plan}`,
      cancel_url: `${origin}/pricing?cancelled=true`,
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
      metadata: {
        plan,
      },
    });

    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to create checkout session',
    });
  }
}
