import { error, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import VideoApi from '$lib/Api/video.server';
import { env } from '$env/dynamic/private';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { commentSchema } from '$lib/Schema/comment.schema';
import CommentApi from '$lib/Api/comment.server';
import SaveApi from '$lib/Api/save.server';
import ViewApi from '$lib/Api/view.server';


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

    const imgUrl = env.API_URL

    const form = await superValidate(zod(commentSchema));

    const apiComment = new CommentApi(fetch);
    const resComments = await apiComment.findAllCommentsInfinite(id, 1, 5);

    if ("error" in resComments) {
        throw error(404, resComments.error.message);
    }

    const apiSave = new SaveApi(fetch);

    const saveResponse = await apiSave.checkSave(id);

    if ("error" in saveResponse) {
        throw error(500, saveResponse.error.message);
    }

    const apiView = new ViewApi(fetch);
    const viewResponse = await apiView.viewVideo(id);

    if ("error" in viewResponse) {
        throw error(500, viewResponse.error.message);

    }

    return {
        video: response.data,
        imgUrl,
        form,
        comments: resComments.data,
        isSaved: saveResponse.data.isSaved,
    };
}) satisfies PageServerLoad;

export const actions: Actions = {
    publishComment: async ({ request, fetch, params }) => {
        const form = await superValidate(request, zod(commentSchema));

        if (!form.valid) {
            return { form };
        }

        const apiComment = new CommentApi(fetch);
        const response = await apiComment.publishComment(form.data.comment, params.id!);

        if ("error" in response) {
            return message(form, {
                error: response.error
            });

        }

        return message(form, {
            success: true,
            response: response.data,
        })
    },

    loadMore: async ({ request, fetch, params }) => {

        const formData = await request.formData();
        const page = Number(formData.get('page') || '1');

        const apiComment = new CommentApi(fetch);
        const res = await apiComment.findAllCommentsInfinite(params.id!, page, 5);

        if ('error' in res) {
            throw error(404, res.error.message);
        }

        return JSON.stringify(res);
    },

    saveVideo: async ({ fetch, params }) => {
        const apiSave = new SaveApi(fetch);
        const response = await apiSave.saveVideo(params.id!);

        if ("error" in response) {
            throw error(500, response.error.message);
        }

        return { success: true };
    },
}