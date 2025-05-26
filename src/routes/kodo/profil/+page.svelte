<script lang="ts">
	import Layout from '$lib/Component/layout/Layout.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const user = data.user;
</script>

<Layout title="Mon profil">
	<div class="flex flex-col gap-3">
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
		<div class="flex justify-center gap-4">
			<a class="note" href="/kodo/profil/video">Mes vidéos</a>
			<a class="note" href="/kodo/profil/save">Mes enregistrements</a>
		</div>
	</div>
	<div class="flex flex-col gap-3">
		<h2>Partage tes contenus et tutoriels avec la communauté de KODO</h2>
		<div class="flex justify-center">
			<a class="text-center relative" href="/kodo/profil/add-video">
				<img src="/images/addvideo.png" alt="Bouton d'ajout de vidéo" />
				<div
					class="size-14 bg-surface-500 absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 rounded-lg z-10 flex items-center justify-center text-6xl"
				>
					+
				</div>
			</a>
		</div>
	</div>
</Layout>

<style>
	.header-diagonal {
		clip-path: polygon(0 0, 100% 0, 100% 100%, 60% 100%, 0 40%);
	}
</style>
