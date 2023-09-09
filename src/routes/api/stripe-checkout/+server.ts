import type { RequestHandler } from './$types';
import { STRIPE_SECRET_KEY } from '$env/static/private';
import Stripe from 'stripe';

const SECRET_STRIPE_KEY = STRIPE_SECRET_KEY || '';
const stripe = new Stripe(SECRET_STRIPE_KEY, {
	apiVersion: '2022-11-15',
	typescript: true
});

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();
	const items = data.items as CartItem[];
	let lineItems: any[] = [];

	items.forEach((item) => {
		lineItems.push({ price: item.id, quantity: item.quantity });
	});

	const session = await stripe.checkout.sessions.create({
		line_items: lineItems,
		mode: 'payment',
		success_url: 'http://localhost:5173/success',
		cancel_url: 'http://localhost:5173/error'
	});

	return new Response(JSON.stringify({ url: session.url }), {
		status: 200,
		headers: { 'content-type': 'application/json' }
	});
};
