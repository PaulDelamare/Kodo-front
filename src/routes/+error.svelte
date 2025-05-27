<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="h-svh bg-primary-500 flex flex-col items-center justify-center gap-2">
	<h1 class=" text-9xl">{$page.status}</h1>
	<span class="text-xl">{$page.error?.message}</span>
	<img src="/images/error.png" alt="Error" />

	<a class="bg-secondary-500 text-primary-500 px-4 py-2 rounded-full" href="/kodo"
		>Retourner à la page d'accueil</a
	>
</div>

<style>
	h1 {
		font-family: 'Modak', system-ui !important;
	}
</style>
