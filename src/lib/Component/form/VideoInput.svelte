<script lang="ts">
	export let name = '';

	let videoUrl: string | null = null;

	function handleFile(event: Event) {
		const input = event.target as HTMLInputElement;
		if (input.files && input.files[0]) {
			const file = input.files[0];
			videoUrl = URL.createObjectURL(file);
		} else {
			videoUrl = null;
		}
	}
</script>

<div class="max-w-xl mx-auto px-4 flex flex-col gap-4 bg-surface-500 rounded-2xl">
	<h2 class="text-2xl font-bold text-secondary-500 text-center">Upload et aperçu vidéo</h2>

	<label
		class="flex flex-col gap-2 items-center justify-center px-6 py-8 bg-tertiary-100/50 rounded-lg border-2 border-dashed border-tertiary-200 hover:border-primary-400 hover:bg-primary-50 transition cursor-pointer"
	>
		<svg class="w-8 fill-secondary-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
			><path
				d="M288 109.3L288 352c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-242.7-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352l128 0c0 35.3 28.7 64 64 64s64-28.7 64-64l128 0c35.3 0 64 28.7 64 64l0 32c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64l0-32c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"
			/></svg
		>
		<span class="text-gray-600">Cliquez pour sélectionner une vidéo</span>
		<span class="text-sm text-gray-400">(formats mp4, webm…)</span>
		<input {name} type="file" accept="video/*" on:change={handleFile} class="hidden" />
	</label>

	{#if videoUrl}
		<div class="">
			<div class="aspect-w-16 aspect-h-9 bg-tertiary-500 rounded-lg overflow-hidden shadow-md">
				<video src={videoUrl} controls preload="metadata" class="w-full h-full object-contain">
					<track kind="captions" label="French captions" src="" srclang="fr" default />
					Votre navigateur ne supporte pas la balise vidéo.
				</video>
			</div>
		</div>
	{/if}
</div>
