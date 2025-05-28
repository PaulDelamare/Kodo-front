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

    resetPasswordRequest = async (email: User['email']): Promise<ApiResponse> => {
        try {
            // Call api
            const response = await this.fetch(
                `${env.API_URL}reset-password`,
                {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({ email })
                }
            );

            // Convert response to json and return
            const data: ApiResponse = await response.json();
            return { ...data };
        } catch (error) {

            // If an error occur, log error and return error
            console.error('Reset Password : ' + error);
            throw new Error('Error Reset Password : ' + error);
        }
    };

    chechResetRequest = async (token: string, userId: string): Promise<ApiResponse & { accessToken: string | null }> => {
        try {
            // Call api
            const response = await this.fetch(
                `${env.API_URL}check-request?token=${token}&userId=${userId}`,
                {
                    method: 'get',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            const newAccessToken = response.headers.get('Authorization');

            // Convert response to json and return
            const data: ApiResponse = await response.json();
            return { ...data, accessToken: newAccessToken };
        } catch (error) {

            // If an error occur, log error and return error
            console.error('Check Reset : ' + error);
            throw new Error('Error Check Reset : ' + error);
        }
    };

    changePassword = async (password: string, password_confirmation: string, userId: string, token: string): Promise<ApiResponse & { accessToken: string | null }> => {
        try {
            // Call api
            const response = await this.fetch(
                `${env.API_URL}change-password`,
                {
                    method: 'post',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ password, password_confirmation, userId, token })
                }
            );

            const newAccessToken = response.headers.get('Authorization');

            // Convert response to json and return
            const data: ApiResponse = await response.json();
            return { ...data, accessToken: newAccessToken };
        } catch (error) {

            // If an error occur, log error and return error
            console.error('Change Password : ' + error);
            throw new Error('Error Change Password : ' + error);
        }
    };
}