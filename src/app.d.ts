// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { User } from "$lib/Models/user.model";

// and what to do when importing types
declare namespace App {
	interface Locals {
		user: User | null;
	}
	// interface PageData {}
	// interface Error {}
	// interface Platform {}
}
