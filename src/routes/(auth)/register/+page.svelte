<script lang="ts">
	import Input from '$lib/Component/form/Input.svelte';
	import Label from '$lib/Component/form/Label.svelte';
	import SubmitButton from '$lib/Component/form/SubmitButton.svelte';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms';
	import { registerSchema } from '$lib/Schema/register.schema';
	import toast from 'svelte-french-toast';
	import { goto } from '$app/navigation';

	export let data: PageData;

	let formValid = false;
	let acceptedTerms = false;

	const { form, errors, validateForm, enhance, message } = superForm(data.form, {
		validators: zodClient(registerSchema),
		validationMethod: 'oninput',

		onChange: async () => {
			const result = await validateForm();
			formValid = result.valid && acceptedTerms;
		}
	});

	$: {
		if ($message && $message.success) {
			$message.success = false;
			toast.success('Inscription réussie !');
			setTimeout(() => {
				goto('/login');
			}, 500);
		}
	}
	

	$: {
		if ($message && $message.error) {
			toast.error($message.error);
			$message.error = false;
		}
	}
</script>

<section class="h-full flex flex-col justify-center pt-[34px]">
	<form
		method="POST"
		action="?/register"
		class="small-wrap flex flex-col gap-4 justify-center"
		use:enhance
	>
		<h2>Inscription</h2>
		<Label label="Nom" required>
			<Input
				placeholder="Nom..."
				bind:value={$form.name}
				error={$errors.name}
				type="text"
				name="name"
			/>
		</Label>
		<Label label="Prénom" required>
			<Input
				placeholder="Prénom..."
				bind:value={$form.firstname}
				error={$errors.firstname}
				type="text"
				name="firstname"
			/>
		</Label>
		<Label label="Email" required>
			<Input
				placeholder="Email..."
				bind:value={$form.email}
				error={$errors.email}
				type="email"
				name="email"
			/>
		</Label>
		<Label label="Mot de passe" required>
			<Input
				placeholder="Mot de passe..."
				bind:value={$form.password}
				error={$errors.password}
				type="password"
				name="password"
			/>
		</Label>
		<Label label="Confirmation mdp" required>
			<Input
				placeholder="Confirmation mdp..."
				bind:value={$form.password_confirmation}
				error={$errors.password_confirmation}
				type="password"
				name="password_confirmation"
			/>
		</Label>

		<label class="flex items-center gap-2 pl-2">
			<input type="checkbox" bind:checked={acceptedTerms} /> J'accepte les conditions d'utilisation
		</label>
		<label class="flex items-center gap-2 pl-2">
			<input type="checkbox" /> Je m'inscris à la newsletter
		</label>
		<SubmitButton disabled={!formValid && !acceptedTerms}>S'inscrire</SubmitButton>
		<p class="font-semibold text-pretty text-center">
			Déjà un compte ? <a class="text-primary-500 font-normal" href="/login">Se connecter</a>
		</p>
	</form>
</section>
