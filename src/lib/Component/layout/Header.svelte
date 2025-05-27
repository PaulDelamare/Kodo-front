<script>
	import { page } from '$app/stores';
	import BellPicto from '../Picto/BellPicto.svelte';
</script>

<header>
	<div class="header-diagonal bg-secondary-500 w-20 h-[90px] p-4">
		<img class="w-full" src="/logo_base.png" alt="Logo" />
	</div>
	{#if $page.url.pathname.startsWith('/kodo')}
		<button class="fixed top-2 right-2 z-10"
			><BellPicto classCustom="w-6 h-6 text-secondary-100" /></button
		>
	{/if}
</header>

<style>
	.header-diagonal {
		clip-path: polygon(0 0, 100% 0, 100% 80%, 80% 100%, 0 100%);
	}
</style>
