import { error, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import UserApi from '$lib/Api/user.server';
import { env } from '$env/dynamic/private';
import FollowerApi from '$lib/Api/follower.server';

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

    console.log(response);
    if ("error" in response) {
        throw error(404, response.error.message);
    }

    const imgUrl = env.API_URL;

    const apiFollower = new FollowerApi(fetch);
    const followResponse = await apiFollower.checkFollow(id);

    if ("error" in followResponse) {
        throw error(500, followResponse.error.message);
    }

    return {
        userProfile: response.data,
        user,
        imgUrl,
        isFollowing: followResponse.data.isFollowing
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
    }
}