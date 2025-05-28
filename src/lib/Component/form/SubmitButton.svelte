<script lang="ts">
	import LoadingPicto from '../Picto/LoadingPicto.svelte';

	export let disabled = false;

	export let isSubmit = false;

	export let wantLoading = false;

	if (wantLoading && isSubmit) {
		disabled = true;
	}
</script>

<div class="flex justify-center">
	<button
		on:click={() => {
			if (wantLoading) {
				isSubmit = true;
			}
		}}
		{disabled}
		class="{disabled
			? 'bg-gray-300 cursor-not-allowed '
			: '!bg-secondary-500 cursor-pointer '} text-surface-500 px-4 py-2 rounded-full text-xl flex items-center gap-2"
	>
		<slot />
		{#if isSubmit}
			<LoadingPicto classCustom="stroke-surface-500 w-8 fill-surface-500" />
		{/if}
	</button>
</div>
