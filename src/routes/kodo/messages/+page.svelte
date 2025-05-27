<script lang="ts">
	import Layout from '$lib/Component/layout/Layout.svelte';
	import { onDestroy } from 'svelte';
	import type { User } from '$lib/Models/user.model';
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	import { timeSince } from '$lib/Utils/formatDate';
	import { superForm } from 'sveltekit-superforms';
	import toast from 'svelte-french-toast';

	export let data: PageData;

	const conversations = data.conversations;

	let query = '';
	let debounceTimeout: ReturnType<typeof setTimeout>;
	let results: User[] = [];
	let loading = false;

	const { form, errors, validateForm, message } = superForm(data.form);

	async function doSearch(q: string) {
		if (!q) {
			results = [];
			return;
		}

		const formData = new FormData();
		formData.append('query', q);

		loading = true;
		try {
			const res = await fetch(`${window.location.pathname}?/search`, {
				method: 'POST',
				body: formData
			});

			if (res.ok) {
				const newCommentsStringify = await res.json();
				const newComments = newCommentsStringify.data;

				const data = JSON.parse(JSON.parse(newComments)).results.data as User[];

				results = data.map((user: User) => ({
					id: user.id,
					firstname: user.firstname,
					name: user.name,
					email: user.email,
					createdAt: user.createdAt,
					updatedAt: user.updatedAt
				}));
			} else {
				console.error('Erreur lors du chargement des produits');
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

	onDestroy(() => {
		clearTimeout(debounceTimeout);
	});

	$: if ($message && $message.success) {
		toast.success('Conversation trouvée avec succès !');
		goto(`/kodo/messages/${$message.response.id}`);
		$message.success = false;
	}
</script>

<Layout padding="" title="Mes messages">
	<div class="flex flex-col items-center gap-6 p-4">
		<input
			type="text"
			bind:value={query}
			on:input={onInput}
			placeholder="Rechercher..."
			class="input-container rounded-full w-full max-w-md"
		/>

		{#if loading}
			<p>Recherche en cours…</p>
		{:else if results.length}
			<ul class="w-full max-w-md divide-y">
				{#each results as user}
					<li class=" cursor-pointer hover:bg-gray-100 rounded">
						<form class=" p-2" use:enhance method="POST" action="?/findConversation">
							<input type="hidden" name="userId" value={user.id} />
							<button>
								{user.firstname}
								{user.name} — {user.email}
							</button>
						</form>
					</li>
				{/each}
			</ul>
		{:else if query}
			<p>Aucun résultat pour « {query} »</p>
		{/if}
	</div>

	<ul class="divide-y-2 divide-secondary-200">
		{#if conversations.length === 0}
			<li class="p-4 text-center">Aucune conversation trouvée.</li>
		{/if}
		{#each conversations as conversation, index}
			<li>
				<a
					href="/kodo/messages/{conversation.conversationId}"
					class="block hover:bg-gray-100 rounded {conversation.lastMessage &&
					conversation.lastMessage.isView
						? 'bg-surface-600'
						: 'bg-surface-500'}"
				>
					{#if index === 0}
						<div class="w-full h-[0.5px] bg-tertiary-500/20"></div>
					{/if}
					<div class="p-4 flex justify-between">
						<div class="flex gap-2">
							<div class="size-12 rounded-lg p-1 bg-red-500">
								<img src="/images/embleme.png" alt="Logo de l'utilisateur" />
							</div>
							<div>
								<h2 class="text-base">{conversation.user.firstname}</h2>
								{#if conversation.lastMessage}
									<p>
										{conversation.lastMessage.content.slice(0, 20)}{conversation.lastMessage.content
											.length > 20
											? '…'
											: ''}
									</p>
								{/if}
							</div>
						</div>
						<div>
							{#if conversation.lastMessage}
								<span class="text-[11px] font-normal">
									{#if conversation.lastMessage && conversation.lastMessage.isView && conversation.lastMessage.viewDate}
										Vu il y a {timeSince(conversation.lastMessage.viewDate)}
									{:else}
										{timeSince(conversation.lastMessage.createdAt)}
									{/if}
								</span>
							{/if}
						</div>
					</div>
					<div class="w-full h-[0.5px] bg-tertiary-500/20"></div>
				</a>
			</li>
		{/each}
	</ul>
</Layout>

<style>
	input:focus {
		outline: none;
		box-shadow: none;
	}
</style>
