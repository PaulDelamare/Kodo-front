import { z } from 'zod';
import type { PageServerLoad } from './$types';
import { message, superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { redirect, type Actions } from '@sveltejs/kit';
import { fail } from 'sveltekit-superforms/client';
import AuthApi from '$lib/Api/auth.server';


const newResetPasswordSchema = z.object({
    email: z.string().email('Email invalide')
})

export const load = (async (event) => {
    const user = event.locals.user;
    if (user) {
        throw redirect(303, '/kodo');
    }

    const form = await superValidate(event, zod(newResetPasswordSchema));

    return {
        form
    };
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async (event) => {
        const form = await superValidate(event, zod(newResetPasswordSchema));
        if (!form.valid) {
            return fail(400, {
                form
            });
        }

        const api = new AuthApi(event.fetch);
        const res = await api.resetPasswordRequest(form.data.email);
        if ("error" in res) {
            return message(form, { error: res.error.message }, {
                status: res.status
            });
        }

        return message(form, { success: true });
    }
}