import { stripe } from '$lib/server/stripe';
import { error, json } from '@sveltejs/kit';
import { STRIPE_ENDPOINT_SECRET } from '$env/static/private';
import type Stripe from 'stripe';

export async function POST({ request }) {
	const body = await request.text();
	const signature = request.headers.get('stripe-signature') || '';

	let event;

	if (STRIPE_ENDPOINT_SECRET === undefined) {
		throw new Error('STRIPE_ENDPOINT_SECRET is not set');
	}

	try {
		event = stripe.webhooks.constructEvent(body, signature, STRIPE_ENDPOINT_SECRET);
	} catch {
		throw error(400, 'Invalid request');
	}

	switch (event.type) {
		case 'payment_intent.succeeded': {
			const payment = event.data.object as Stripe.PaymentIntent;

			break;
		}
	}

	return json({ status: 'success' });
}
