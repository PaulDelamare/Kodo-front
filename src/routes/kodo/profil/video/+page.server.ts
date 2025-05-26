import VideoApi from '$lib/Api/video.server';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';

export const load = (async ({ fetch, locals }) => {

    const apiVideo = new VideoApi(fetch);
    const response = await apiVideo.findAllUserVideo();

    if ("error" in response) {
        throw error(500, "Erreur lors de la récupération des vidéos");
    }

    const user = locals.user!;

    const imgUrl = env.API_URL;

    return {
        videos: response.data,
        user,
        imgUrl
    };
}) satisfies PageServerLoad;