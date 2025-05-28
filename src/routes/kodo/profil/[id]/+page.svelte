<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto, invalidateAll } from '$app/navigation';
	import Layout from '$lib/Component/layout/Layout.svelte';
	import ArrowLeftPicto from '$lib/Component/Picto/ArrowLeftPicto.svelte';
	import BellPicto from '$lib/Component/Picto/BellPicto.svelte';
	import HeartEmptyPicot from '$lib/Component/Picto/HeartEmptyPicot.svelte';
	import HeartPicto from '$lib/Component/Picto/HeartPicto.svelte';
	import UsersPicto from '$lib/Component/Picto/UsersPicto.svelte';
	import Baniere from '$lib/Component/utils/Baniere.svelte';
	import { goBack } from '$lib/Utils/goBack';
	import { superForm } from 'sveltekit-superforms';
	import type { ActionData, PageData } from './$types';
	import toast from 'svelte-french-toast';

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

	const { message } = superForm(data.form);

	$: if ($message && $message.error) {
		toast.error($message.error);
		$message.error = false;
	}

	$: if ($message && $message.success) {
		toast.success('Conversation trouvée avec succès !');
		goto(`/kodo/messages/${$message.response.id}`);
		$message.success = false;
	}
</script>

<Layout padding="" title="Mon profil">
	{#if user && userProfile.videos && imgUrl}
		<!-- <Baniere link={false} user={userProfile} /> -->

		<div class="flex flex-col gap-3">
			<div
				class="w-full max-w-[500px] mx-auto relative h-40"
				style="background-image: url('/images/fond.jpg'); background-size: cover; background-position: center;"
			></div>
		</div>
		<div class="flex gap-2 justify-start max-w-[80%] mx-auto w-full">
			<div class="header-diagonal bg-primary-500 size-20 flex justify-end items-center pr-1 pb-2">
				<div class="size-14 rounded-full p-1">
					<img src="/images/embleme.png" alt="Logo de l'utilisateur" />
				</div>
			</div>
			<div class="flex flex-col justify-center items-start">
				<h2 class="!font-bold leading-none text-secondary-500">{userProfile.firstname}</h2>
				<h3 class="leading-none text-secondary-500">{userProfile.name}</h3>
			</div>
		</div>
		<div class="max-w-[80%] w-full mx-auto flex items-center justify-between gap-4">
			<button type="button" on:click={goBack}>
				<ArrowLeftPicto classCustom="w-6" />
			</button>
			<div class="flex items-center gap-4">
				<form use:enhance method="POST" action="?/follow" class="">
					<button
						class=" {isFollowing
							? 'bg-surface-500 text-tertiary-500'
							: ' text-tertiary-500'} py-1 rounded flex items-center gap-1 !font-normal !text-base"
						>{#if isFollowing}
							Suivi<HeartPicto classCustom="w-5 fill-secondary-500" />
						{:else}
							S'abonner<BellPicto classCustom="w-5" />
						{/if}
					</button>
				</form>
				<form class=" p-2" method="POST" action="?/findConversation" use:enhance>
					<input type="hidden" name="userId" value={userProfile.id} />
					<button class="!font-normal !text-base text-tertiary-500"> Contacter </button>
				</form>
			</div>
			<div></div>
		</div>

		<div class="space-y-6">
			{#each userProfile.videos as video}
				<div class="flex flex-col items-center gap-2">
					<!-- Lien vers la page de détail de la vidéo -->
					<div class="w-full max-w-[80%] flex flex-col gap-2 relative">
						<a href={`/kodo/cours/${video.id}`} class="block">
							<div class="relative">
								<!-- Image miniature -->
								<img
									crossorigin="anonymous"
									src={`${imgUrl}${video.thumbnailUrl || video.videoUrl.replace('.mp4', '_thumb.jpg')}`}
									alt={video.title}
									class="w-full object-contain rounded-lg shadow-md"
								/>
							</div>

							<div class="flex justify-between px-4">
								<h3 class="text-lg font-semibold text-center">{video.title}</h3>
								<p class="text-sm text-gray-600 text-center flex items-center gap-2">
									<UsersPicto classCustom="w-4" />{video._count.views}
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

<style>
	.header-diagonal {
		clip-path: polygon(0 0, 100% 0, 100% 100%, 60% 100%, 0 40%);
	}
</style>
