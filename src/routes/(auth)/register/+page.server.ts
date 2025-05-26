import { message, superValidate } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { registerSchema } from '$lib/Schema/register.schema';
import type { Actions } from '@sveltejs/kit';
import AuthApi from '$lib/Api/auth.server';

export const load = (async () => {

    const form = await superValidate(zod(registerSchema));

    return {
        form
    };
}) satisfies PageServerLoad;

export const actions: Actions = {
    register: async ({ request, fetch }) => {

        console.log('here')
        const form = await superValidate(request, zod(registerSchema));

        if (!form.valid) {
            return message(form, {
                error: 'Formulaire invalide',
                status: 400
            })
        }
        const authApi = new AuthApi(fetch);
        const response = await authApi.register(
            form.data.email,
            form.data.firstname,
            form.data.name,
            form.data.password,
            form.data.password_confirmation
        )
        console.log(response)

        if ("error" in response) {
            return message(form, {
                error: response.error.message,
                status: response.status
            });
        }

        return message(form, {
            success: true,
            status: 200
        });

    }
}