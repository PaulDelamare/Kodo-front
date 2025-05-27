<script lang="ts">
	import Layout from '$lib/Component/layout/Layout.svelte';
	import UsersPicto from '$lib/Component/Picto/UsersPicto.svelte';
	import Baniere from '$lib/Component/utils/Baniere.svelte';
	import DeleteButton from '$lib/Component/utils/DeleteButton.svelte';
	import MultiButton from '$lib/Component/utils/MultiButton.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const videos = data.videos;
	const user = data.user;
	const imgUrl = data.imgUrl;
</script>

<Layout title="Mon profil">
	{#if user && videos && imgUrl}
		<Baniere {user} />
		<div class="space-y-6 mt-6">
			{#each videos as video, index}
				<div class="flex flex-col items-center gap-2">
					<!-- Lien vers la page de détail de la vidéo -->
					<div class="w-full max-w-xs flex flex-col gap-2 relative">
						<div class="absolute top-2 right-2 z-10">
							<MultiButton {index} identification="video">
								<form on:submit={() => alert('Bientôt disponible')} class="p-2">
									<input name="id" type="hidden" value={video.id} />
									<DeleteButton />
								</form>
							</MultiButton>
						</div>

						<a href={`/kodo/cours/${video.id}`} class="block">
							<div class="relative">
								<!-- Image miniature -->
								<img
									crossorigin="anonymous"
									src={`${imgUrl}${video.thumbnailUrl || video.videoUrl.replace('.mp4', '_thumb.jpg')}`}
									alt={video.title}
									class="w-full max-w-xs max-h-[320pxpx] object-contain rounded-lg shadow-md"
								/>
							</div>

							<div class="flex justify-between px-4">
								<h3 class="text-lg font-semibold text-center">{video.title}</h3>
								<p class="text-sm text-gray-600 text-center flex items-center gap-2">
									<UsersPicto classCustom="w-4" />{video.viewCount}
								</p>
							</div>
						</a>
					</div>
				</div>
			{:else}
				<p class="text-center mt-8">Aucune vidéo trouvée.</p>
			{/each}
		</div>
	{:else}
		<p class="text-center mt-8">Chargement...</p>
	{/if}
</Layout>
