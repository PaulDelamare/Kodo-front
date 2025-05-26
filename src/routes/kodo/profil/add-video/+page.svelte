<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import Input from '$lib/Component/form/Input.svelte';
	import Select from '$lib/Component/form/Select.svelte';
	import SubmitButton from '$lib/Component/form/SubmitButton.svelte';
	import VideoInput from '$lib/Component/form/VideoInput.svelte';
	import Layout from '$lib/Component/layout/Layout.svelte';
	import { videoSchema } from '$lib/Schema/video.schema';
	import type { PageData } from './$types';
	import type { AutocompleteOption } from '@skeletonlabs/skeleton';
	import toast from 'svelte-french-toast';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let data: PageData;

	let categorieValue = '';

	const flavorOptions: AutocompleteOption<string>[] = [
		{ label: 'Graphisme', value: 'graphisme', keywords: 'graphisme, design' },
		{ label: '3D Art', value: '3d-art', keywords: '3d, art' },
		{ label: 'UI / UX', value: 'ui-ux', keywords: 'ui, ux' }
	];

	let formValid = false;

	const { form, errors, validateForm, message } = superForm(data.form, {
		validators: zodClient(videoSchema),
		validationMethod: 'oninput',

		onChange: async () => {
			const result = await validateForm();
			if (!result.valid) {
				formValid = false;
				return;
			}
			formValid = true;
		}
	});

	$: if ($message && $message.error) {
		toast.error($message.error);
	}

	$: if (categorieValue) {
		$form.categorie = categorieValue as 'graphisme' | '3d-art' | 'ui-ux';
	}

	$: if ($message && $message.success) {
		toast.success('Votre vidéo a été publiée avec succès !');

		setTimeout(() => {
			goto($message.redirect);
		}, 700);

		$message.success = false;
	}
</script>

<Layout title="Publication">
	<form
		action="?/addVideo"
		method="POST"
		class="flex flex-col gap-4"
		enctype="multipart/form-data"
		use:enhance
	>
		<VideoInput name="video" />
		<Select options={flavorOptions} bind:value={categorieValue} />
		<Input name="title" placeholder="Titre de la vidéo" bind:value={$form.title} />
		<input type="hidden" name="categorie" value={categorieValue} />
		<SubmitButton>Publier</SubmitButton>
	</form>
</Layout>
