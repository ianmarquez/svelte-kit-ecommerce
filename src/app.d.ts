// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Locals {}
	// interface PageData {}
	// interface Error {}
	// interface Platform {}
}

declare class Product {
	id: string; // stripe id
	name: string; // coffee
	price: number; // 5
}

declare class CartItem {
	id: Product['id'];
	quantity: number;
}
