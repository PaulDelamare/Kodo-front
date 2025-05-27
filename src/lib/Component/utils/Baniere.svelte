<script lang="ts">
	import { page } from '$app/stores';
	import type { User } from '$lib/Models/user.model';
	import { goBack } from '$lib/Utils/goBack';
	import ArrowLeftPicto from '../Picto/ArrowLeftPicto.svelte';

	export let user: User;
	export let link = true;
	export let goBackButton = true
</script>

<div class="flex flex-col gap-3">
	{#if goBackButton}
		<div class="p-4">
			<button on:click={goBack}>
				<ArrowLeftPicto classCustom="w-6" />
			</button>
		</div>
		
	{/if}
	<div
		class="w-full max-w-[500px] mx-auto relative h-40 rounded-3xl"
		style="background-image: url('/images/fond.jpg'); background-size: cover; background-position: center;"
	>
		<div class="absolute flex gap-2 -bottom-[0.5px] left-0">
			<div class="header-diagonal bg-primary-500 size-14 flex justify-end items-center pr-1 pb-2">
				<div class="size-10 rounded-full p-1">
					<img src="/images/embleme.png" alt="Logo de l'utilisateur" />
				</div>
			</div>
			<div class="flex flex-col justify-center items-start">
				<h2 class="!font-bold leading-none text-surface-500">{user.firstname}</h2>
				<h3 class="leading-none text-surface-500">{user.name}</h3>
			</div>
		</div>
	</div>
	{#if link}
		<div class="flex justify-center gap-4">
			<a
				class="note {$page.url.pathname === '/kodo/profil/video'
					? '!bg-secondary-500 text-surface-500'
					: ''}"
				href="/kodo/profil/video"
			>
				Mes vidéos
			</a>
			<a class="note {$page.url.pathname === '/kodo/profil/save'
					? '!bg-secondary-500 text-surface-500'
					: ''}"  href="/kodo/profil/save">
				Mes enregistrements
			</a>
		</div>
	{/if}
</div>

<style>
	.header-diagonal {
		clip-path: polygon(0 0, 100% 0, 100% 100%, 60% 100%, 0 40%);
	}
</style>
