import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { env } from '$env/dynamic/private';

export const load = (async ({ locals }) => {
    if (!locals.user) {
        return redirect(302, '/login');
    }

    const imgUrl = env.API_URL;

    return {
        user: locals.user,
        imgUrl
    };
}) satisfies LayoutServerLoad;