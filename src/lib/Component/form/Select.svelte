<script lang="ts">
	import {
		Autocomplete,
		popup,
		type AutocompleteOption,
		type PopupSettings
	} from '@skeletonlabs/skeleton';

	export let options: AutocompleteOption<string>[];
	export let value = '';

	let search = '';

	let popupSettings: PopupSettings = {
		event: 'focus-click',
		target: 'popupAutocomplete',
		placement: 'bottom'
	};

	function onSelection(event: CustomEvent<AutocompleteOption<string>>): void {
		search = event.detail.label;
		value = event.detail.value;
	}
</script>

<div class="relative">
	<input
		class="w-full autocomplete !border border-primary-500 rounded-full"
		type="search"
		name="autocomplete-search"
		bind:value={search}
		placeholder="Catégorie"
		use:popup={popupSettings}
	/>
	<div class="absolute bottom-0 w-full" data-popup="popupAutocomplete">
		<div class="bg-surface-50 shadow-lg max-h-28 overflow-y-auto w-full rounded-b-md">
			<Autocomplete on:selection={onSelection} bind:input={search} {options} />
		</div>
	</div>
</div>
