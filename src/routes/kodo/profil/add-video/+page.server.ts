import { videoSchema } from '$lib/Schema/video.schema';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';
import { message, superValidate } from 'sveltekit-superforms';
import { redirect, type Actions } from '@sveltejs/kit';
import VideoApi from '$lib/Api/video.server';

export const load = (async () => {

    const form = await superValidate(zod(videoSchema));

    return {
        form
    };
}) satisfies PageServerLoad;

export const actions: Actions = {
    addVideo: async ({ request, fetch }) => {

        const formDataForm = await request.formData();

        const form = await superValidate(formDataForm, zod(videoSchema));

        if (!form.valid) {
            return { form };
        }

        const apiVideo = new VideoApi(fetch);
        const formData = new FormData();
        formData.append('title', form.data.title);
        formData.append('categorie', form.data.categorie);
        formData.append('video', form.data.video);

        const response = await apiVideo.create(formData);

        if ("error" in response) {
            return message(form, {
                success: false,
                error: response.error
            });

        }

        redirect(303, `/kodo/cours/${response.data.id}`);
    }
}