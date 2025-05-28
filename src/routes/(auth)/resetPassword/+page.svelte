<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';
	import Input from '$lib/Component/form/Input.svelte';
	import Label from '$lib/Component/form/Label.svelte';
	import SubmitButton from '$lib/Component/form/SubmitButton.svelte';
	import toast from 'svelte-french-toast';
	import ArrowLeftPicto from '$lib/Component/Picto/ArrowLeftPicto.svelte';
	import { goBack } from '$lib/Utils/goBack';

	export let data: PageData;

	const { form, errors, enhance, message } = superForm(data.form, {
		taintedMessage:
			'Êtes vous sur de vouloir quitter cette page ? Les données ne seront pas sauvegardées'
	});

	$: if ($message?.success) {
		$message.success = false;
		toast.success('Un email vous a été envoyé');
	}
</script>

<section class=" h-full mx-auto flex justify-center items-center w-full max-w-lg px-4">
	<button on:click={goBack}>
		<ArrowLeftPicto classCustom="w-6" />
	</button>
	<form method="post" use:enhance class="flex flex-col gap-8 w-full">
		<div class="!max-w-36 mx-auto">
			<img src="https://kodo.evift.fr/logo_base.png" alt="Logo Kodo" />
		</div>
		<div class="flex flex-col gap-8 w-full">
			<div class="flex flex-col gap-8 w-full">
				<Label label="Email"
					><Input
						placeholder="Email..."
						error={$errors.email}
						bind:value={$form.email}
						name="email"
						type="email"
					/></Label
				>
			</div>
			<SubmitButton>Envoyer</SubmitButton>
		</div>
	</form>
</section>
