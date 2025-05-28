import ConversationApi from '$lib/Api/conversation.server';
import { error, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { z } from 'zod';
import UserApi from '$lib/Api/user.server';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms';
import { message } from 'sveltekit-superforms';
import { findConvSchema } from '$lib/Schema/findConv.schema';

const searchSchema = z.object({
    query: z.string().min(1)
});

export const load = (async ({ fetch }) => {

    const apiConversation = new ConversationApi(fetch);
    const response = await apiConversation.findAllUserConversation();

    if ("error" in response) {
        throw error(404, response.error.message);
    }


    const form = await superValidate(zod(findConvSchema));

    return {
        conversations: response.data,
        form
    };
}) satisfies PageServerLoad;

export const actions: Actions = {
    search: async ({ request, fetch }) => {
        const form = await request.formData();
        const query = form.get('query');

        const parsed = searchSchema.safeParse({ query });

        if (!parsed.success) {
            return { results: [], error: 'Recherche invalide' };
        }

        const apiUser = new UserApi(fetch)
        const users = await apiUser.findUsersByText(parsed.data.query);

        if ("error" in users) {
            return { results: [], error: users.error.message };

        }

        return JSON.stringify({ results: users });
    },

    findConversation: async ({ request, fetch }) => {

        const form = await superValidate(request, zod(findConvSchema));

        if (!form.valid) {
            return message(form, {
                error: 'Formulaire invalide'
            });
        }

        const apiConversation = new ConversationApi(fetch);
        const response = await apiConversation.findConversationByUserId(form.data.userId);


        if ("error" in response) {
            throw message(form, {
                error: response.error.message
            });
            ;
        }

        return message(form, {
            success: true,
            response: response.data
        });

    }
};