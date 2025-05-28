<script lang="ts">
	import { page } from '$app/stores';
	import Header from '$lib/Component/layout/Header.svelte';
	import InstallButton from '$lib/Component/utils/InstallButton.svelte';
	import { Toaster } from 'svelte-french-toast';
	import '../app.postcss';
	import Navbar from '$lib/Component/layout/Navbar.svelte';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';

	let innerWidth: number;

	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
</script>

<svelte:window bind:innerWidth />

{#if innerWidth > 1200}
	<div
		style="
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		margin: 0;
	"
	>
		<h1
			class="leading-normal"
			style="
			font-size: 3em;
			text-align: center;
		"
		>
			Ce site est uniquement disponible sur mobile
		</h1>
	</div>
{:else if !$page.error}
	<section class="h-svh flex flex-col justify-between">
		<div class="w-full !h-10 fixed top-0 left-0 z-[100] bg-surface-500">
			<Header />
		</div>
		<div class="flex-1 flex flex-col pt-10 {$page.url.pathname.startsWith('/kodo') ? 'pb-24' : ''}">
			<slot />
		</div>

		{#if $page.url.pathname.startsWith('/kodo')}
			<div class="w-full h-20 fixed bottom-0 left-0 z-10">
				<Navbar />
			</div>
		{/if}
	</section>
	<InstallButton />
	<Toaster position="bottom-center" />
{:else}
	<slot />
{/if}
