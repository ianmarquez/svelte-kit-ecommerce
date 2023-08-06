<script lang="ts">
	import ProductCard from '$lib/productCard.svelte';
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';
	import { get } from 'svelte/store';
	import { cartItems } from '../cart';
	const flipDurationMs = 300;

	let products: Product[] = [
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

	function handleConsider(event: CustomEvent<DndEvent<Product>>) {
		products = event.detail.items;
	}

	function handleFinalize(event: CustomEvent<DndEvent<Product>>) {
		products = event.detail.items;
	}
</script>

<div class="container h-full mx-auto flex justify-center items-center max-w-[500px]">
	<div class="flex flex-col gap-4 w-full">
		<div class="col-span-3">
			<h1>SvelteKit 1.0 Store</h1>
		</div>
		{#if products.length > 0}
			<section
				use:dndzone={{ items: products, flipDurationMs, dropTargetStyle: {} }}
				on:consider={handleConsider}
				on:finalize={handleFinalize}
				class="flex flex-col gap-4"
			>
				{#each products as product (product.id)}
					<div class="card flex flex-col gap-4" animate:flip={{ duration: 300 }}>
						<ProductCard {product} />
					</div>
				{/each}
			</section>
		{/if}
		<div class="col-span-3">
			<button class="btn variant-filled-primary" on:click={() => checkout()}
				>Checkout with Stripe API</button
			>
		</div>
	</div>
</div>
