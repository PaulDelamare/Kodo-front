<script lang="ts">
	import Input from '$lib/Component/form/Input.svelte';
	import Label from '$lib/Component/form/Label.svelte';
	import { superForm } from 'sveltekit-superforms';
	import type { PageData } from './$types';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { loginSchema } from '$lib/Schema/login.schema';
	import SubmitButton from '$lib/Component/form/SubmitButton.svelte';
	import toast from 'svelte-french-toast';

	export let data: PageData;

	let formValid = false;

	const { form, errors, validateForm, enhance, message } = superForm(data.form, {
		validators: zodClient(loginSchema),
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

	$: {
		if ($message && $message.error) {
			toast.error($message.error);
		}
	}
</script>

<section class="h-full flex flex-col justify-center pt-[34px]">
	<form
		method="POST"
		action="?/login"
		class="small-wrap flex flex-col gap-6 justify-center"
		use:enhance
	>
		<h2>Connexion</h2>
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
		<div class="pl-6">
			<button
				type="button"
				class="!text-secondary-500"
				on:click={() =>
					alert(
						"Pas encore dispo, je n'ai eu que 3 jours... Vous pensiez vraiment que j'allais tout faire ? Non, laissez tomber, vous ne retrouverez pas votre mot de passe."
					)}>Mot de passe oublié ?</button
			>
		</div>

		<label class="flex items-center gap-2 pl-2"> <input type="checkbox" /> Rester connecté </label>
		<SubmitButton disabled={!formValid}>Se connecter</SubmitButton>
		<p class="font-semibold text-pretty text-center">
			Vous n'avez pas encore de compte ? <a class="text-primary-500 font-normal" href="/register"
				>S'inscrire</a
			>
		</p>
	</form>
</section>
