<script lang="ts">
	export let disabled = false;
</script>

<div class="flex justify-center">
	<button
		{disabled}
		class="{disabled
			? 'bg-gray-300 cursor-not-allowed '
			: '!bg-secondary-500 cursor-pointer '} text-surface-500 px-4 py-2 rounded-full text-xl"
	>
		<slot />
	</button>
</div>
