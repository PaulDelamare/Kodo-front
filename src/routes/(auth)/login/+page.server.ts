import { loginSchema } from '$lib/Schema/login.schema';
import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import AuthApi from '$lib/Api/auth.server';

export const load = (async () => {

    const form = await superValidate(zod(loginSchema));

    return {
        form
    };
}) satisfies PageServerLoad;

export const actions: Actions = {
    login: async ({ request, fetch, cookies }) => {
        const form = await superValidate(request, zod(loginSchema));

        const api = new AuthApi(fetch)
        const res = await api.login(form.data.email, form.data.password, true)

        if ("error" in res) {
            return message(form, res.error.message, {
                status: res.status
            });
        }

        cookies.set('access_token', res.data.accessToken, {
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'
        });
    }
}