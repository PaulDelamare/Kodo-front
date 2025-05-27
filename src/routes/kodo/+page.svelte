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

	let activeFilter: '' | 'graphisme' | '3d-art' | 'ui-ux' | 'follow' = '';

	const filterData: Record<'' | 'graphisme' | '3d-art' | 'ui-ux' | 'follow', any> = {
		'': { label: 'Toutes', description: 'Tous les cours disponibles' },
		graphisme: { label: 'Graphisme', description: 'Cours de graphisme' },
		'3d-art': { label: '3D Art', description: 'Cours de 3D Art' },
		'ui-ux': { label: 'UI / UX', description: 'Cours de UI / UX' },
		follow: { label: 'Suivi', description: 'Cours que vous suivez' }
	};

	let loadMoreInUse = false;

	const filters = [
		{ label: 'Toutes', value: '' },
		{ label: 'Suivi', value: 'follow' },
		{ label: 'Graphisme', value: 'graphisme' },
		{ label: '3D Art', value: '3d-art' },
		{ label: 'UI / UX', value: 'ui-ux' }
	];

	const changeActiveFilter = (filter: string) => {
		activeFilter = filter as '' | 'graphisme' | '3d-art' | 'ui-ux' | 'follow';
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

	let query = '';
	let debounceTimeout: ReturnType<typeof setTimeout>;
	let loading = false;

	let results: Video[] = [];

	async function doSearch(q: string) {
		if (!q) {
			results = [];
			return;
		}

		const formData = new FormData();
		formData.append('query', q);
		formData.append('categorie', activeFilter);

		loading = true;
		try {
			const res = await fetch(`${window.location.pathname}?/search`, {
				method: 'POST',
				body: formData
			});

			if (res.ok) {
				const newCommentsStringify = await res.json();
				const newComments = newCommentsStringify.data;

				const data = JSON.parse(JSON.parse(newComments)).results.data as Video[];

				results = data;
			}
		} catch (e) {
			console.error('Recherche échouée', e);
		} finally {
			loading = false;
		}
	}

	function onInput() {
		clearTimeout(debounceTimeout);
		debounceTimeout = setTimeout(() => {
			doSearch(query);
		}, 500);
	}
</script>

<Layout padding="" title="Accueil">
	{#if videos && imgUrl}
		<div bind:this={toggleContainer}></div>
		<div class="px-8 relative w-full">
			<input
				bind:value={query}
				on:input={onInput}
				type="search"
				placeholder="Rechercher..."
				class="input-container rounded-full w-full"
			/>
			{#if query && results.length > 0}
				<div
					class="absolute top-11 left-0 w-full bg-surface-200 border shadow-xl rounded-lg p-4 z-50"
				>
					<h3 class="text-lg font-semibold mb-2">Résultats de la recherche</h3>
					<ul class=" divide-y divide-primary-500">
						{#each results as video, index}
							<li class="">
								{#if index === 0}
									<div class="h-[0.5px] w-full bg-primary-500"></div>
								{/if}

								<a
									href={`/kodo/cours/${video.id}`}
									class="text-secondary-500 flex justify-between py-2"
								>
									<span class="font-bold">
										{video.title.slice(0, 20)}{video.title.length > 20 ? '…' : ''}</span
									>
									<span>{video.user.firstname}</span>
								</a>
							</li>
						{/each}
					</ul>
				</div>
			{/if}
			<div></div>
		</div>

		<h2 class=" border-b-2">{filterData[activeFilter].label}</h2>

		<div class="space-y-6 px-4">
			<div class="overflow-x-auto">
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

			{#each videos as video}
				<div class="flex flex-col items-center gap-2">
					<!-- Lien vers la page de détail de la vidéo -->
					<div class="w-full flex flex-col gap-2 relative">
						<div
							class="header-diagonal bg-primary-500 size-14 flex justify-end items-center pr-1 pt-2 absolute top-0 left-0 z-10"
						>
							<a href={`/kodo/profil/${video.user.id}`} class="size-10 rounded-full p-1">
								<img src="/images/embleme.png" alt="Logo de l'utilisateur" />
							</a>
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
								<h3 class="text-lg font-semibold text-center">{video.title}</h3>
								<p class="text-sm text-gray-600 text-center flex items-center gap-2">
									<UsersPicto classCustom="w-4" />{video._count.views}
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
