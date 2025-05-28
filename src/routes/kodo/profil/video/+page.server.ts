import VideoApi from '$lib/Api/video.server';
import { error, type Actions } from '@sveltejs/kit';
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

export const actions: Actions = {
    delete: async ({ request, fetch }) => {
        const formData = await request.formData();
        const id = formData.get('id') as string;

        if (!id) {
            throw error(400, "ID de la vidéo manquant");
        }

        const apiVideo = new VideoApi(fetch);
        const response = await apiVideo.deleetVideo(id);

        if ("error" in response) {
            throw error(500, "Erreur lors de la suppression de la vidéo");
        }

        return { success: true };
    }
}