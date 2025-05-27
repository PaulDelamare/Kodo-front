import { env } from '$env/dynamic/private';
import { error, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import ConversationApi from '$lib/Api/conversation.server';
import { z } from 'zod';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

const messageSchema = z.object({
    content: z.string().min(1, 'Le message doit avoir au moins 1 caractère').max(500, 'Le message ne doit pas dépasser 500 caractères'),
});

export const load = (async ({ cookies, params, fetch }) => {

    const id = params.id;
    if (!id) {
        throw error(404, 'Message not found');
    }

    const websocketKey = env.WEBSOCKET_KEY;
    const bearer = cookies.get('access_token')!;

    const apiConversation = new ConversationApi(fetch);
    const checkConversation = await apiConversation.checkConversationExists(id);

    if ("error" in checkConversation) {
        throw error(404, checkConversation.error.message);
    }

    const response = await apiConversation.findAllMessagesByConversationId(id);

    if ("error" in response) {
        throw error(404, response.error.message);
    }

    const messageView = await apiConversation.defineAllMessageView(id);

    if ("error" in messageView) {
        throw error(500, messageView.error.message);
    }

    const form = await superValidate(zod(messageSchema));


    return {
        websocketKey,
        bearer,
        id,
        messages: response.data,
        form,
        checkConv: checkConversation.data,
    };
}) satisfies PageServerLoad;

export const actions: Actions = {
    sendMessage: async ({ request, fetch, params }) => {
        const form = await superValidate(request, zod(messageSchema));

        if (!form.valid) {
            return message(form, {
                error: 'Le contenu n\'est pas valide'
            })
        }

        const apiConversation = new ConversationApi(fetch);
        const response = await apiConversation.sendMessage(params.id!, form.data.content);

        if ("error" in response) {
            return message(form, {
                error: response.error.message
            })
        }

        return message(form, {
            success: 'Message envoyé avec succès',
        })
    }
}