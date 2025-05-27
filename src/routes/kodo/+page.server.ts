import VideoApi from '$lib/Api/video.server';
import { error, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch }) => {

    const apiVideo = new VideoApi(fetch);
    const response = await apiVideo.findAllVideoInfinite(1, 2);


    if ("error" in response) {
        throw new Error("Erreur lors de la récupération des vidéos");
    }

    return {
        videos: response.data,
    };
}) satisfies PageServerLoad;

export const actions: Actions = {
    loadMore: async ({ request, fetch }) => {

        const formData = await request.formData();
        const page = Number(formData.get('page') || '1');
        const filter = formData.get('filter') as 'graphisme' | '3d-art' | 'ui-ux' | 'follow' || undefined;

        const apiComment = new VideoApi(fetch);
        const res = await apiComment.findAllVideoInfinite(page, 2, filter);


        if ('error' in res) {
            throw error(404, res.error.message);
        }

        return JSON.stringify(res);
    },
    search: async ({ request, fetch }) => {
        const formData = await request.formData();
        const query = formData.get('query') as string;
        const categorie = formData.get('categorie') as 'graphisme' | '3d-art' | 'ui-ux' | 'follow' || undefined;

        if (!query) {
            throw error(400, 'Search term is required');
        }


        const apiVideo = new VideoApi(fetch);
        const response = await apiVideo.findVideoByName(query, categorie);

        if ("error" in response) {
            throw error(500, "Erreur lors de la recherche des vidéos");
        }

        return JSON.stringify({ results: response });
    }
}