<script lang="ts">
	export let type = 'text';
	export let value: string | number = '';
	export let error: undefined | string[] = undefined;
	export let placeholder = '';
	export let name = '';
</script>

<div
	class="rounded-full w-full border {value
		? error
			? '!border-error-500'
			: '!border-success-500'
		: 'border-primary-500'}"
>
	{#if type === 'text'}
		<input
			{name}
			type="text"
			{placeholder}
			class="input-container rounded-full w-full"
			bind:value
		/>
	{:else if type === 'number'}
		<input
			{name}
			type="number"
			{placeholder}
			class="input-container rounded-full w-full"
			bind:value
		/>
	{:else if type === 'email'}
		<input
			{name}
			type="email"
			{placeholder}
			class="input-container rounded-full w-full"
			bind:value
		/>
	{:else if type === 'password'}
		<input
			{name}
			type="password"
			{placeholder}
			class="input-container rounded-full w-full"
			bind:value
		/>
	{/if}
</div>

{#if error}
	<p class="text-red-500 text-sm mt-1">{error}</p>
{/if}

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
