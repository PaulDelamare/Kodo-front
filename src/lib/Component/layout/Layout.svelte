<script lang="ts">
	export let title: string;
	export let padding = 'p-4';
	export let classCustom = '';
</script>

<section>
	<div
		class="fixed left-0 top-10 w-full z-10 bg-surface-500 h-[50px] border-y-2 flex items-center justify-center {classCustom}"
	>
		<slot name="more" />
		<h2>{title}</h2>
		<slot name="actions" />
	</div>

	<div class="flex flex-col gap-4 {padding} pt-16">
		<slot />
	</div>
</section>
