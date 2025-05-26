<script lang="ts">
	export let label: string;
	export let required: boolean = false;
</script>

<label class="flex flex-col gap-1">
	<span class="pl-2"
		>{label}{#if required}<span class="text-red-500">*</span>{/if}</span
	>

	<slot />
</label>
