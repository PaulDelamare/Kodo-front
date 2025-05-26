import { env } from '$env/dynamic/private';
import type { ApiResponse } from '$lib/Models/response.model';
import type { User } from '$lib/Models/user.model';
import { Api } from './api.server';

export default class AuthApi extends Api {
    login = async (email: User['email'], password: string, remerberMe: boolean | string): Promise<ApiResponse<{ user: User } & { accessToken: string }>> => {
        try {
            const response = await this.fetch(
                `${env.API_URL}login`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({ email, password, remerberMe })
                }
            );

            const data: ApiResponse<{ user: User } & { accessToken: string }> = await response.json();

            return { ...data };
        } catch (error) {

            console.error('Login : ' + error);
            throw new Error('Error Login : ' + error);
        }
    };

    register = async (email: User['email'], firstname: User['firstname'], name: User['name'], password: string, password_confirmation: string): Promise<ApiResponse> => {
        try {
            const response = await this.fetch(
                `${env.API_URL}register`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, firstname, name, password, password_confirmation }),
                    credentials: 'include'
                }
            );

            const data: ApiResponse = await response.json();
            return data;
        } catch (error) {

            console.error('Register : ' + error);
            throw new Error('Error Register : ' + error);
        }
    };
}