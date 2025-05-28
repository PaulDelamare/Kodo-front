import { error, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { z } from 'zod';
import { superValidate, message, fail } from 'sveltekit-superforms/client';
import { zod } from 'sveltekit-superforms/adapters';
import AuthApi from '$lib/Api/auth.server';

const newChangePasswordSchema = z.object({
    password: z.string()
        .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
        .max(30, 'Le mot de passe doit contenir au maximum 30 caractères'),
    password_confirmation: z.string()
        .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
        .max(30, 'Le mot de passe doit contenir au maximum 30 caractères'),
})

export const load = (async (event) => {

    const apiPassword = new AuthApi(event.fetch)
    const res = await apiPassword.chechResetRequest(event.params.token, event.params.userId);


    if ("error" in res) {
        throw error(404, 'Not found');
    }

    const form = await superValidate(event, zod(newChangePasswordSchema));

    return {
        form
    };
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async (event) => {

        const apiPassword = new AuthApi(event.fetch)
        const res = await apiPassword.chechResetRequest(event.params.token!, event.params.userId!);

        if ("error" in res) {
            throw error(404, 'Not found');
        }

        const form = await superValidate(event, zod(newChangePasswordSchema));

        if (!form.valid) {
            return fail(400, {
                form
            });
        }

        const api = new AuthApi(event.fetch);
        const resPassword = await api.changePassword(form.data.password, form.data.password_confirmation, event.params.userId!, event.params.token!);

        if ("error" in resPassword) {
            return message(form, { error: resPassword.error.message }, {
                status: resPassword.status
            });
        }

        redirect(303, '/login');
    }
}