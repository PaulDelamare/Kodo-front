// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces


// and what to do when importing types
declare namespace App {
	interface Locals {
		user: {
			id: string;
			firstname: string;
			name: string;
			email: string;
			createdAt: Date;
			updatedAt: Date;
		} | null;
	}
	// interface PageData {}
	// interface Error {}
	// interface Platform {}
}
