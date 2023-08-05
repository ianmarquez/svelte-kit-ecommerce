import { writable, get } from 'svelte/store';

export const cartItems = writable<CartItem[]>([]);

export const addToCart = (id: CartItem['id']) => {
	let items = get(cartItems);
	let itemPos = items.findIndex((item) => item.id === id);

	if (itemPos !== -1) {
		cartItems.update(() => {
			let updatedItems = items.map((item) => {
				if (item.id === id) {
					return { ...item, quantity: item.quantity + 1 };
				}
				return item;
			});
			return updatedItems;
		});
	} else {
		cartItems.update(() => {
			return [...items, { id, quantity: 1 }];
		});
	}
};

export const removeFromCart = (id: CartItem['id']) => {
	let items = get(cartItems);
	let itemPos = items.findIndex((item) => item.id === id);

	if (items[itemPos]?.quantity - 1 === 0) {
		items.splice(itemPos, 1);
	}

	cartItems.update(() => {
		let updatedItems = items.map((item) => {
			if (item.id === id) {
				return { ...item, quantity: item.quantity - 1 };
			}
			return item;
		});
		return updatedItems;
	});
};
