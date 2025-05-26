import { env } from '$env/dynamic/private';
import UserApi from '$lib/Api/user.server';
import type { HandleFetch } from '@sveltejs/kit';

export async function handle({ event, resolve }) {

    const token = event.cookies.get('access_token');

    if (!token) return await resolve(event);

    if (event.locals.user) {

        return await resolve(event);
    }

    const api = new UserApi(event.fetch);
    const userInfo = await api.getInfo();

    if ('error' in userInfo) {
        event.cookies.delete('access_token', { path: '/' });
        event.locals.user = null;
    } else {
        event.locals.user = userInfo.data;
    }

    return await resolve(event);
}

/**
 * Handles the fetch request by setting the 'x-api-key' header if the request URL starts with the API_URL.
 *
 * @param options - The options object containing the request and fetch functions.
 * @param options.request - The request object.
 * @param options.fetch - The fetch function.
 * @return  The response from the fetch request.
 */
export const handleFetch = (async ({ request, fetch, event }) => {
    const apiUrl = new URL(env.API_URL);
    const requestUrl = new URL(request.url);

    if (requestUrl.href.startsWith(apiUrl.href)) {
        request.headers.set('x-api-key', env.API_KEY);

        // Get jwt from cookies
        const jwt = event.cookies.get('access_token');
        // If jwt, set the 'Authorization' header
        if (jwt) {
            request.headers.set('Authorization', `Bearer ${jwt}`);
        }
    }

    // Return the fetch request
    return fetch(request);
}) satisfies HandleFetch;
