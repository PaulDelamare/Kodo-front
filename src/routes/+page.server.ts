import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {

    if (!locals.user) {
        throw redirect(303, '/login');
    } else {
        throw redirect(303, '/kodo');
    }
}) satisfies PageServerLoad;

export const actions: Actions = {
    logout: async ({ locals, cookies }) => {
        locals.user = null;
        cookies.delete('access_token', { path: '/' });
        throw redirect(303, '/login');
    }
}