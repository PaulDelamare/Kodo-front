import { error, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import UserApi from '$lib/Api/user.server';
import { env } from '$env/dynamic/private';
import FollowerApi from '$lib/Api/follower.server';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { findConvSchema } from '$lib/Schema/findConv.schema';
import { message } from 'sveltekit-superforms';
import ConversationApi from '$lib/Api/conversation.server';

export const load = (async ({ params, locals, fetch }) => {

    const id = params.id;
    if (!id) {
        throw error(404, 'Profil not found');
    }
    const user = locals.user!;

    if (user.id === id) {
        redirect(302, `/kodo/profil`);
    }

    const apiUser = new UserApi(fetch);

    const response = await apiUser.findUserById(id);

    if ("error" in response) {
        throw error(404, response.error.message);
    }

    const imgUrl = env.API_URL;

    const apiFollower = new FollowerApi(fetch);
    const followResponse = await apiFollower.checkFollow(id);

    if ("error" in followResponse) {
        throw error(500, followResponse.error.message);
    }

    const form = await superValidate(zod(findConvSchema));

    return {
        userProfile: response.data,
        user,
        imgUrl,
        isFollowing: followResponse.data.isFollowing,
        form
    };
}) satisfies PageServerLoad;

export const actions: Actions = {
    follow: async ({ fetch, params }) => {

        const apiFollower = new FollowerApi(fetch);
        const response = await apiFollower.followUser(params.id!);

        if ("error" in response) {
            throw error(500, response.error.message);
        }

        return { success: true };
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
}