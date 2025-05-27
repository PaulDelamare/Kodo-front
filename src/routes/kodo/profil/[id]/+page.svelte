<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import Layout from '$lib/Component/layout/Layout.svelte';
	import HeartEmptyPicot from '$lib/Component/Picto/HeartEmptyPicot.svelte';
	import HeartPicto from '$lib/Component/Picto/HeartPicto.svelte';
	import UsersPicto from '$lib/Component/Picto/UsersPicto.svelte';
	import Baniere from '$lib/Component/utils/Baniere.svelte';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	const user = data.user;
	const userProfile = data.userProfile;
	const imgUrl = data.imgUrl;

	let isFollowing = data.isFollowing;
	export let form: ActionData;

	$: if (form && form.success) {
		form.success = false;

		invalidateAll().then(() => {
			isFollowing = data.isFollowing;
		});
	}
</script>

<Layout title="Mon profil">
	{#if user && userProfile.videos && imgUrl}
		<Baniere link={false} user={userProfile} />
		<form use:enhance method="POST" action="?/follow" class="ml-auto">
			<button
				class=" {isFollowing
					? 'bg-secondary-500 text-surface-500'
					: 'bg-surface-600 text-tertiary-500'} ml-auto py-2 px-4 rounded flex items-center gap-2"
				>{#if isFollowing}
					<HeartPicto classCustom="w-5 fill-surface-500" /> Suivi
				{:else}
					<HeartEmptyPicot classCustom="w-5" />Suivre
				{/if}
			</button>
		</form>

		<div class="space-y-6 mt-6">
			{#each userProfile.videos as video}
				<div class="flex flex-col items-center gap-2">
					<!-- Lien vers la page de détail de la vidéo -->
					<div class="w-full max-w-xs flex flex-col gap-2 relative">
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
			{/each}
		</div>
	{:else}
		<p class="text-center mt-8">Chargement...</p>
	{/if}
</Layout>
