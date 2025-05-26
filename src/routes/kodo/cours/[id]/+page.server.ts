import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import VideoApi from '$lib/Api/video.server';

export const load = (async ({ fetch, params }) => {
    const id = params.id;
    if (!id) {
        throw error(404, 'Course not found');
    }

    const apiVideo = new VideoApi(fetch);
    const response = await apiVideo.findVideoById(id);

    if ("error" in response) {
        throw error(500, "Erreur lors de la récupération de la vidéo");
    }

    return {
        video: response.data
    };
}) satisfies PageServerLoad;