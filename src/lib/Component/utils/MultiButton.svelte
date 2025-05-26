<script lang="ts">
	import MorePicto from '../Picto/MorePicto.svelte';

	export let index: number;
	export let side: 'end' | 'start' = 'end';
	export let identification: string;

	let isOpen = false;
	let isAtBottom = false;
	let details: HTMLDetailsElement;
	let innerHeight = 0;

	function clickOutside(node: HTMLElement) {
		const handleClick = (event: MouseEvent) => {
			if (
				!node.contains(event.target as Node) &&
				!(event.target as HTMLElement).closest('.close-button')
			) {
				document.querySelectorAll(`.${identification}`).forEach((el) => el.removeAttribute('open'));
				isOpen = false;
			}
		};
		document.addEventListener('click', handleClick, true);
		return { destroy: () => document.removeEventListener('click', handleClick, true) };
	}

	function toggle(event: MouseEvent) {
		const current = document.querySelector(`.${identification}-${index}`);
		const rect = current?.getBoundingClientRect();
		document.querySelectorAll(`.${identification}`).forEach((el) => {
			if (el !== current && !el.contains(event.target as Node)) el.removeAttribute('open');
		});
		isAtBottom = (rect?.bottom ?? 0) + 200 > window.innerHeight;
		isOpen = !isOpen;
	}

	$: {
		if (isOpen && details) {
			const rect = details.getBoundingClientRect();
			isAtBottom = rect.bottom + 100 > innerHeight;
		}
	}
</script>

<svelte:window bind:innerHeight />

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<details
	bind:this={details}
	class="{identification} {identification}-{index} group relative [&_summary::-webkit-details-marker]:hidden"
	use:clickOutside
	on:click={toggle}
>
	<summary
		class="bg-tertiary-50/80 size-6 flex items-center justify-center !border-none !ring-0 rounded-full"
	>
		<!-- <span class="text-secondary-500 px-2 py-[7px]"><slot name="summary" /></span> -->
		<span class="">
			<span class="sr-only">Menu</span>
			<MorePicto classCustom="w-1 rotate-90" />
		</span>
	</summary>

	<div
		class={`z-50 group-open:absolute ${side === 'end' ? 'group-open:end-0' : 'group-open:start-0'} divide-secondary-100 bg-surface-50 w-56 rounded-md ${isAtBottom ? 'mb-2 group-open:bottom-full' : 'mt-2 group-open:top-full'} group-open:mt-2`}
		role="menu"
	>
		<slot />
	</div>
</details>
