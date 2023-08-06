<script lang="ts">
	import { get } from 'svelte/store';
	export let product: Product = { id: '', name: '', price: 0 };
	import { cartItems, addToCart, removeFromCart } from '../cart';

	let cart = get(cartItems);
	let cartItemIndex = cart.findIndex((item) => item.id === product.id);
	let cartProduct = cart[cartItemIndex];
	cartItems.subscribe((newCartItem) => {
		cart = newCartItem;
		cartItemIndex = cart.findIndex((item) => item.id === product.id);
		cartProduct = cart[cartItemIndex];
	});
</script>

<header class="card-header">
	<h2>{product.name}</h2>
	{#if cartProduct !== undefined}
		<div class="card-body px-4">
			Quantity: <strong>{cartProduct.quantity}</strong>
		</div>
	{/if}
</header>
<div class="card-body px-4">Price: ${product.price}</div>
<footer class="card-footer text-right">
	<button class="p-2 rounder variant-glass-primary rounded" on:click={() => addToCart(product.id)}
		>Add</button
	>
	<button
		class="p-2 rounder variant-glass-error rounded"
		on:click={() => removeFromCart(product.id)}>Remove</button
	>
</footer>
