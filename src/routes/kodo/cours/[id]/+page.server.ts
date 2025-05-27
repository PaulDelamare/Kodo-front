import { error, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import VideoApi from '$lib/Api/video.server';
import { env } from '$env/dynamic/private';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { commentSchema } from '$lib/Schema/comment.schema';
import CommentApi from '$lib/Api/comment.server';


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
    const resComments = await apiComment.getAllProductByMerchantId(id, 1, 5);

    if ("error" in resComments) {
        throw error(404, resComments.error.message);
    }

    return {
        video: response.data,
        imgUrl,
        form,
        comments: resComments.data,
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
        const res = await apiComment.getAllProductByMerchantId(params.id!, page, 5);

        if ('error' in res) {
            throw error(404, res.error.message);
        }

        return JSON.stringify(res);
    }
}