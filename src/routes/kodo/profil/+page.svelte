<script lang="ts">
	import Layout from '$lib/Component/layout/Layout.svelte';
	import Baniere from '$lib/Component/utils/Baniere.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const user = data.user;
</script>

<Layout title="Mon profil">
	<Baniere goBackButton={false} {user} />
	<div class="flex flex-col items-center gap-12">
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
		<form class="flex justify-center" action="/?/logout" method="POST">
			<div>
				<button class="bg-red-500 rounded-full py-2 px-4 text-surface-500">Déconnexion</button>
			</div>
		</form>
	</div>
</Layout>
