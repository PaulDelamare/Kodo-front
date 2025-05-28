<script lang="ts">
	import Input from '$lib/Component/form/Input.svelte';
	import Label from '$lib/Component/form/Label.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';
	import SubmitButton from '$lib/Component/form/SubmitButton.svelte';
	import toast from 'svelte-french-toast';
	import { goto } from '$app/navigation';

	export let data: PageData;

	const { form, errors, enhance, message } = superForm(data.form, {
		taintedMessage:
			'Êtes vous sur de vouloir quitter cette page ? Les données ne seront pas sauvegardées'
	});

	if ($message && $message.success) {
		$message.success = false;
		toast.success('Votre mot de passe a été modifié avec succès !');
		setTimeout(() => {
			goto('/login');
		}, 500);
	}
</script>

<section class="container h-full mx-auto flex justify-center items-center">
	<form method="post" use:enhance class="flex flex-col gap-8 w-full max-w-lg px-4">
		<div class="!max-w-36 mx-auto">
			<img src="https://kodo.evift.fr/logo_base.png" alt="Logo Kodo" />
		</div>
		<div class="flex flex-col gap-8">
			<div class="flex flex-col gap-8">
				<Label label="Nouveau mot de passe">
					<Input
						error={$errors.password}
						bind:value={$form.password}
						name="password"
						type="password"
						placeholder="Nouveau mot de passe..."
					/>
				</Label>

				<Label label="Confirmation mot de passe">
					<Input
						error={$errors.password_confirmation}
						bind:value={$form.password_confirmation}
						name="password_confirmation"
						type="password"
						placeholder="Confirmation mot de passe..."
					/>
				</Label>
			</div>
			<SubmitButton>Envoyer</SubmitButton>
		</div>
	</form>
</section>
