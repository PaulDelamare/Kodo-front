<script lang="ts">
	import Layout from '$lib/Component/layout/Layout.svelte';
	import UsersPicto from '$lib/Component/Picto/UsersPicto.svelte';
	import Baniere from '$lib/Component/utils/Baniere.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const savedVideos = data.savedVideos;
	const imgUrl = data.imgUrl;
	const user = data.user;
</script>

<Layout title="Mon profil">
	{#if user && savedVideos && imgUrl}
		<Baniere {user} />
		<div class="space-y-6 mt-6">
			{#each savedVideos as video, index}
				<div class="flex flex-col items-center gap-2">
					<!-- Lien vers la page de détail de la vidéo -->
					<div class="w-full max-w-xs flex flex-col gap-2 relative">
						<a href={`/kodo/cours/${video.video.id}`} class="block">
							<div class="relative">
								<!-- Image miniature -->
								<img
									crossorigin="anonymous"
									src={`${imgUrl}${video.video.thumbnailUrl || video.video.videoUrl.replace('.mp4', '_thumb.jpg')}`}
									alt={video.video.title}
									class="w-full max-w-xs max-h-[320pxpx] object-contain rounded-lg shadow-md"
								/>
							</div>

							<div class="flex justify-between px-4">
								<h3 class="text-lg font-semibold text-center">{video.video.title}</h3>
								<p class="text-sm text-gray-600 text-center flex items-center gap-2">
									<UsersPicto classCustom="w-4" />{video.video._count.views}
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
