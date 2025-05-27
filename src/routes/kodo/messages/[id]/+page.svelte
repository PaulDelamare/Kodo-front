<script lang="ts">
	import ArrowLeftPicto from '$lib/Component/Picto/ArrowLeftPicto.svelte';
	import { getYoutubeData, linkify, matchYoutubeUrl } from '$lib/Utils/cleanHtml';
	import { formatDate, formatTime } from '$lib/Utils/formatDate';
	import { goBack } from '$lib/Utils/goBack';
	import { afterUpdate, onDestroy, onMount } from 'svelte';
	import type { PageData } from './$types';
	import TextPicto from '$lib/Component/Picto/TextPicto.svelte';
	import { enhance } from '$app/forms';
	import SendPicto from '$lib/Component/Picto/SendPicto.svelte';
	import { WebSocketManager } from '$lib/Websocket/Websocket';
	import type { Message } from '$lib/Models/message.model';
	import Layout from '$lib/Component/layout/Layout.svelte';
	import { tick } from 'svelte';

	export let data: PageData;

	const websocketKey = data.websocketKey;
	const bearer = data.bearer;
	const user = data.user;
	const id = data.id;
	let messages = data.messages;
	const checkConv = data.checkConv;

	let ws: WebSocketManager<Message>;

	function handleMessage(message: Message | { event: string }) {
		// Add new message to messages list if it's a message object
		if ('id' in message) {
			messages = [...messages, message as Message];
		}
	}

	ws = new WebSocketManager(websocketKey, bearer, handleMessage, 'join', id);

	onMount(async () => {
		ws.connect();

		await tick();
		if (element) scrollToBottom();
	});

	onDestroy(() => {
		ws.close();
	});

	export let element: HTMLElement;

	afterUpdate(() => {
		if (messages) scrollToBottom();
	});
	let messageToSend = '';

	let toggleContainer: HTMLElement;

	function scrollToBottom() {
		// Remonter l’élément bindé en haut du viewport, puis ajuster de 90px vers le haut
		toggleContainer?.scrollIntoView({ behavior: 'smooth', block: 'end' });
	}
</script>

<Layout title={checkConv.otherUser.firstname}>
	<div class="fixed left-4 top-28">
		<button on:click={() => goBack()}>
			<ArrowLeftPicto classCustom="w-6" />
		</button>
	</div>
	<div class="flex h-full overflow-hidden">
		<!-- Main Chat Area -->
		<div class="flex-1 flex flex-col justify-between">
			<!-- Chat Messages -->
			<div bind:this={element} class="h-full max-w-full overflow-y-auto p-4">
				{#each messages as message}
					{#if message.content}
						<div class="flex flex-col gap-1 mb-1">
							<p class="text-sm font-light {user.id === message.sender?.id ? 'text-end' : ''}">
								{user.id === message.sender?.id
									? 'Vous'
									: message.sender?.firstname + ' ' + message.sender?.name}
							</p>
							<div class="flex {user.id === message.sender?.id ? 'flex-row-reverse' : ''}">
								<div
									class="w-9 h-9 rounded-full flex items-center justify-center {user.id ===
									message.sender?.id
										? 'ml-2'
										: 'mr-2'}"
								>
									{#if user.id === message.sender?.id}
										<img src="/images/embleme.png" alt="My Avatar" class="w-8 h-8 rounded-full" />
									{:else}
										<img
											src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
											alt="User Avatar"
											class="w-8 h-8 rounded-full"
										/>
									{/if}
								</div>
								<div class="flex flex-col gap-1">
									<div
										class="flex max-w-96 rounded-3xl px-2 py-2 gap-3 {user.id === message.sender?.id
											? 'bg-primary-500 !rounded-br-lg'
											: 'bg-secondary-500 !rounded-bl-lg'}"
									>
										<p
											class=" {user.id === message.sender?.id
												? 'text-surface-500'
												: 'text-surface-500'}"
										>
											{@html linkify(message.content)}
											{#if matchYoutubeUrl(message.content)}
												{#await getYoutubeData(message.content) then data}
													{@html data}
												{/await}
											{/if}
										</p>
									</div>
									<time class="text-sm font-extralight not-italic self-end"
										>{#if formatDate(new Date(message.createdAt)) === formatDate(new Date())}
											{formatTime(new Date(message.createdAt))}
										{:else}
											{formatDate(new Date(message.createdAt))}
											{formatTime(new Date(message.createdAt))}
										{/if}</time
									>
								</div>
							</div>
						</div>
					{/if}
				{/each}
			</div>
			<form
				method="POST"
				action="?/sendMessage"
				class="fixed bottom-24 left-2/4 -translate-x-2/4 rounded-full border w-[90%] border-tertiary-100 flex items-center bg-surface-500"
				use:enhance
			>
				<label class="w-full flex items-center rounded-full px-4"
					><TextPicto classCustom="w-5 fill-tertiary-500" /><input
						class="!w-full rounded-full border-none"
						type="text"
						name="content"
						value={messageToSend}
					/></label
				>
				<button class=" px-4 block h-full"
					><SendPicto classCustom="w-5 fill-tertiary-500 py-2" /></button
				>
			</form>
		</div>
	</div>
	<div class="pb-28" bind:this={toggleContainer}></div>
</Layout>

<style>
	input {
		border: none;
	}
	input:focus {
		outline: none;
		box-shadow: none;
		border: none;
	}
</style>
