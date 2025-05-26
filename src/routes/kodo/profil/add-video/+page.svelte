<script lang="ts">
	import VideoInput from '$lib/Component/form/VideoInput.svelte';
	import Layout from '$lib/Component/layout/Layout.svelte';
	import type { PageData } from './$types';
	import { Autocomplete, popup } from '@skeletonlabs/skeleton';
	import type { AutocompleteOption, PopupSettings } from '@skeletonlabs/skeleton';

	export let data: PageData;

	let popupSettings: PopupSettings = {
		event: 'focus-click',
		target: 'popupAutocomplete',
		placement: 'bottom'
	};

	let inputDemo = '';
	const flavorOptions: AutocompleteOption<string>[] = [
		{ label: 'Vanilla', value: 'vanilla', keywords: 'plain, basic', meta: { healthy: false } },
		{ label: 'Chocolate', value: 'chocolate', keywords: 'dark, white', meta: { healthy: false } },
		{ label: 'Strawberry', value: 'strawberry', keywords: 'fruit', meta: { healthy: true } },
		{
			label: 'Neapolitan',
			value: 'neapolitan',
			keywords: 'mix, strawberry, chocolate, vanilla',
			meta: { healthy: false }
		},
		{ label: 'Pineapple', value: 'pineapple', keywords: 'fruit', meta: { healthy: true } },
		{ label: 'Peach', value: 'peach', keywords: 'fruit', meta: { healthy: true } }
	];

	function onFlavorSelection(event: CustomEvent<AutocompleteOption<string>>): void {
		inputDemo = event.detail.label;
	}
</script>

<Layout title="Publication">
	<div class="flex flex-col gap-4">
		<VideoInput />

		<div class="relative">
			<input
				class="w-full autocomplete !border border-tertiary-200 rounded-full"
				type="search"
				name="autocomplete-search"
				bind:value={inputDemo}
				placeholder="Search..."
				use:popup={popupSettings}
			/>
			<div class="absolute bottom-0 w-full" data-popup="popupAutocomplete">
				<div class="bg-surface-50 shadow-lg max-h-24 overflow-y-auto w-full rounded-b-md">
					<Autocomplete bind:input={inputDemo} options={flavorOptions} />
				</div>
			</div>
		</div>
	</div>
</Layout>
