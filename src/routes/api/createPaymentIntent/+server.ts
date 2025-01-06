import { stripe } from '$lib/server/stripe';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

const PREMIUM_COST = 1000;

export const POST: RequestHandler = async ({ request }) => {
	const { customer } = await request.json();

	const paymentIntent = await stripe.paymentIntents.create({
		amount: PREMIUM_COST,
		currency: 'usd',
		payment_method_types: ['card'],
		metadata: {
			customer
		}
	});

	const response = {
		clientSecret: paymentIntent.client_secret
	};

	return json(response);
};
