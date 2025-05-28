import SaveApi from '$lib/Api/save.server';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';

export const load = (async ({ fetch, locals }) => {
    const user = locals.user;

    const apiSave = new SaveApi(fetch);
    const response = await apiSave.findAllSavedVideos();

    if ("error" in response) {
        throw error(500, "Erreur lors de la récupération des vidéos sauvegardées");
    }

    const imeUrl = env.API_URL;

    return {
        savedVideos: response.data,
        imeUrl,
        user
    };
}) satisfies PageServerLoad;