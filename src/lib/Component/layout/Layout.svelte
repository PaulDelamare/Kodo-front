<script lang="ts">
	export let title: string;
</script>

<section class="">
	<div
		class="fixed left-0 top-10 w-full z-10 bg-surface-500 h-[50px] border-y-2 flex items-center justify-center"
	>
		<h2>{title}</h2>
	</div>

	<div class="flex flex-col gap-4 p-4 pt-16">
		<slot />
	</div>
</section>
