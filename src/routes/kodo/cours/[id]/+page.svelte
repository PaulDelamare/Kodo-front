<script lang="ts">
	import Layout from '$lib/Component/layout/Layout.svelte';
	import ArrowLeftPicto from '$lib/Component/Picto/ArrowLeftPicto.svelte';
	import SendPicto from '$lib/Component/Picto/SendPicto.svelte';
	import TextPicto from '$lib/Component/Picto/TextPicto.svelte';
	import { goBack } from '$lib/Utils/goBack';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms';
	import { commentSchema } from '$lib/Schema/comment.schema';
	import toast from 'svelte-french-toast';
	import { enhance } from '$app/forms';
	import type { Comment } from '$lib/Models/comment.model';
	import { onMount } from 'svelte';
	import UsersPicto from '$lib/Component/Picto/UsersPicto.svelte';

	export let data: PageData;

	const video = data.video;
	const imgUrl = data.imgUrl;
	let comments = data.comments;

	let formValid = false;

	const { form, errors, validateForm, message } = superForm(data.form, {
		validators: zodClient(commentSchema),
		validationMethod: 'oninput',

		onChange: async () => {
			const result = await validateForm();
			if (!result.valid) {
				formValid = false;
				return;
			}
			formValid = true;
		}
	});

	$: if ($message && $message.error) {
		toast.error($message.error);
		$message.error = false;
	}

	$: if ($message && $message.success) {
		toast.success('Votre commentaire a été publié avec succès !');
		$message.success = false;

		comments = [$message.response, ...comments];
	}

	let page = 2;
	let hasMore = true;

	async function loadMore() {
		const formData = new FormData();
		formData.append('page', page.toString());

		const res = await fetch(`${window.location.pathname}?/loadMore`, {
			method: 'POST',
			body: formData
		});

		if (res.ok) {
			const newCommentsStringify = await res.json();
			const newComments: Comment[] = JSON.parse(JSON.parse(newCommentsStringify.data)).data;

			if (newComments.length === 0) {
				hasMore = false;
			} else {
				const existingIds = new Set(comments.map((p) => p.id));
				const uniqueNewComments = newComments.filter((p) => !existingIds.has(p.id));

				comments = [...comments, ...uniqueNewComments];

				page++;
			}
		} else {
			console.error('Erreur lors du chargement des produits');
		}
	}

	let sentinel: HTMLDivElement;

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
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


</script>

<Layout padding="pb-20" title="Video">
	<div class="p-4">
		<button on:click={goBack}>
			<ArrowLeftPicto classCustom="w-6" />
		</button>
	</div>
	<div class="mx-auto relative flex flex-col gap-2 p-4">
		<div
			class="header-diagonal bg-primary-500 size-14 flex justify-end items-center pr-1 pt-2 absolute top-4 left-4"
		>
			<div class="size-10 rounded-full p-1">
				<img src="/images/embleme.png" alt="Logo de l'utilisateur" />
			</div>
		</div>
		<video
			crossorigin="anonymous"
			src={`${imgUrl}${video.videoUrl}`}
			class="w-full max-w-md object-contain rounded-lg shadow-md"
			controls
			preload="metadata"
			muted
			playsinline
		></video>
		<div class="flex justify-between px-4">
			<h3 class="text-lg font-semibold text-center">{video.title}</h3>
			<p class="text-sm text-gray-600 text-center flex items-center gap-2">
				<UsersPicto classCustom="w-4" />{video.viewCount}
			</p>
		</div>
	</div>
	<div
		class="fixed left-0 bottom-20 w-full h-20 rounded-t-3xl border-2 flex items-center justify-center px-4 z-10 bg-surface-500"
	>
		<form
			method="POST"
			action="?/publishComment"
			class="rounded-full border w-full border-tertiary-100 flex items-center"
			use:enhance
		>
			<label class="w-full flex items-center rounded-full px-4"
				><TextPicto classCustom="w-5 fill-tertiary-500" /><input
					class="!w-full rounded-full border-none"
					type="text"
					name="comment"
				/></label
			>
			<button class=" px-4 block h-full"
				><SendPicto classCustom="w-5 fill-tertiary-500 py-2" /></button
			>
		</form>
	</div>

	<div class="rounded-t-2xl comments w-full p-4">
		{#each comments as comment}
			<div class="flex items-end gap-2">
				<div class="size-10 rounded-full p-1">
					<img src="/images/embleme.png" alt="Logo de l'utilisateur" />
				</div>
				<div class="flex flex-col">
					<h4>{comment.user?.firstname}</h4>
					<p class="bg-secondary-500 text-surface-500 w-fit text-pretty py-2 px-4 rounded-full">
						{comment.comment}
					</p>
				</div>
			</div>
		{/each}

		<div bind:this={sentinel}></div>
	</div>
</Layout>

<style>
	.header-diagonal {
		clip-path: polygon(60% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 60%);
	}

	input:focus {
		outline: none;
		box-shadow: none;
		border: none;
	}

	.comments {
		box-shadow:
			0 -4px 8px -2px rgba(0, 0, 0, 0.12),
			0 -1px 4px -1px rgba(0, 0, 0, 0.1);
	}
</style>
