<script lang="ts">
	import ProductCard from '$lib/productCard.svelte';
	import { get } from 'svelte/store';
	import { cartItems } from '../cart';

	const products: Product[] = [
		{
			id: 'price_1NbgUVIDaGCsNkMz9Lv0jojB',
			name: 'Coffee',
			price: 5
		},
		{
			id: 'price_1NbgVpIDaGCsNkMzY0FDj4If',
			name: 'Sunglasses',
			price: 10
		},
		{
			id: 'price_1NbgWUIDaGCsNkMzlUfsmWSC',
			name: 'Water Bottle',
			price: 15
		}
	];

	async function checkout() {
		const response = await fetch('api/stripe-checkout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ items: get(cartItems) })
		}).then((data) => data.json());
		window.location.replace(response.url);
	}
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="grid grid-cols-3 gap-4">
		<div class="col-span-3">
			<h1>SvelteKit 1.0 Store</h1>
		</div>
		{#each products as product}
			<ProductCard {product} />
		{/each}
		<div class="col-span-3">
			<button class="btn variant-filled-primary" on:click={() => checkout()}
				>Checkout with Stripe API</button
			>
		</div>
	</div>
</div>
