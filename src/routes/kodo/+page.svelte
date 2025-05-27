<script lang="ts">
	import Layout from '$lib/Component/layout/Layout.svelte';
	import UsersPicto from '$lib/Component/Picto/UsersPicto.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import type { Video } from '$lib/Models/video.model';
	import { fly } from 'svelte/transition';
	import ChevronDownPicto from '$lib/Component/Picto/ChevronDownPicto.svelte';

	export let data: PageData;

	let videos = data.videos;
	const imgUrl = data.imgUrl;

	let sentinel: HTMLDivElement;

	let pageData = 2;
	let hasMore = true;

	let activeFilter: '' | 'graphisme' | '3d-art' | 'ui-ux' = '';

	let loadMoreInUse = false;

	const filters = [
		{ label: 'Toutes', value: '' },
		{ label: 'Graphisme', value: 'graphisme' },
		{ label: '3D Art', value: '3d-art' },
		{ label: 'UI / UX', value: 'ui-ux' }
	];

	const changeActiveFilter = (filter: string) => {
		console.log('here');
		activeFilter = filter as '' | 'graphisme' | '3d-art' | 'ui-ux';
		pageData = 1;
		videos = [];
		loadMore();
	};

	async function loadMore() {
		loadMoreInUse = true;
		const formData = new FormData();
		formData.append('page', pageData.toString());
		if (activeFilter) {
			formData.append('filter', activeFilter);
		}

		const res = await fetch(`${window.location.pathname}?/loadMore`, {
			method: 'POST',
			body: formData
		});

		if (res.ok) {
			const newCommentsStringify = await res.json();
			const data = JSON.parse(JSON.parse(newCommentsStringify.data)).data as Video[];

			if (data.length === 0) {
				hasMore = false;
			} else {
				const existingIds = new Set(videos.map((p) => p.id));
				const uniqueNewComments = data.filter((p) => !existingIds.has(p.id));

				videos = [...videos, ...uniqueNewComments];

				pageData++;
			}
		} else {
			console.error('Erreur lors du chargement des produits');
		}
		loadMoreInUse = false;
	}

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && !loadMoreInUse) {
						loadMore();
					}
				});
			},
			{ rootMargin: '200px' }
		);
		if (sentinel) observer.observe(sentinel);
		return () => {
			if (sentinel) observer.unobserve(sentinel);
		};
	});

	onMount(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				showScrollTop = !entry.isIntersecting;
				console.log('herehuieifhuir', !entry.isIntersecting);
			},
			{ threshold: 0 }
		);
		if (toggleContainer) observer.observe(toggleContainer);
		return () => {
			if (toggleContainer) observer.unobserve(toggleContainer);
		};
	});

	let toggleContainer: HTMLElement;
	let showScrollTop = false;

	function scrollToTop() {
		// Remonter l’élément bindé en haut du viewport, puis ajuster de 90px vers le haut
		toggleContainer?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
</script>

<Layout title="Accueil">
	{#if videos && imgUrl}
		<div bind:this={toggleContainer}></div>
		<div class="space-y-6 mt-2">
			<div class="overflow-x-auto py-2">
				<div class="flex gap-2 px-4 mx-auto">
					{#each filters as filter}
						<button
							class="note whitespace-nowrap {activeFilter === filter.value
								? '!bg-secondary-500 text-surface-500'
								: ''}"
							on:click={() => {
								changeActiveFilter(filter.value);
							}}
						>
							{filter.label}
						</button>
					{/each}
				</div>
			</div>

			{#each videos as video, index}
				<div class="flex flex-col items-center gap-2">
					<!-- Lien vers la page de détail de la vidéo -->
					<div class="w-full flex flex-col gap-2 relative">
						<div
							class="header-diagonal bg-primary-500 size-14 flex justify-end items-center pr-1 pt-2 absolute top-0 left-0 z-10"
						>
							<div class="size-10 rounded-full p-1">
								<img src="/images/embleme.png" alt="Logo de l'utilisateur" />
							</div>
						</div>
						<a href={`/kodo/cours/${video.id}`} class="block">
							<div class="relative">
								<img
									crossorigin="anonymous"
									src={`${imgUrl}${video.thumbnailUrl || video.videoUrl.replace('.mp4', '_thumb.jpg')}`}
									alt={video.title}
									class="w-full max-h-[320px] object-contain rounded-lg shadow-md"
								/>
							</div>

							<div class="flex justify-between px-4">
								<h3 class="text-lg font-semibold text-center">{video.title} {video.categorie}</h3>
								<p class="text-sm text-gray-600 text-center flex items-center gap-2">
									<UsersPicto classCustom="w-4" />{video.viewCount}
								</p>
							</div>
						</a>
					</div>
				</div>
			{/each}
			<div bind:this={sentinel}></div>
		</div>
	{:else}
		<p class="text-center mt-8">Chargement...</p>
	{/if}
</Layout>

{#if showScrollTop}
	<button
		in:fly={{ x: 200, y: 0, duration: 300 }}
		out:fly={{ x: 200, y: 0, duration: 300 }}
		on:click={scrollToTop}
		class="btn bg-primary-500/80 z-[1000] preset-filled-surface-500 fixed right-4 bottom-24 z-100 rounded-full p-3 shadow-2xl transition"
	>
		<ChevronDownPicto classCustom="w-6 h-6 fill-surface-500 transform -rotate-180 fill-current" />
	</button>
{/if}

<style>
	.header-diagonal {
		clip-path: polygon(60% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 60%);
	}
</style>
