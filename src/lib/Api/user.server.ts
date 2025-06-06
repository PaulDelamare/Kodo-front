import { env } from '$env/dynamic/private';
import type { ApiResponse } from '$lib/Models/response.model';
import type { User } from '$lib/Models/user.model';
import { Api } from './api.server';

export default class UserApi extends Api {
    getInfo = async (): Promise<ApiResponse<User & { accessToken: string }>> => {
        try {
            const response = await this.fetch(
                `${env.API_URL}user/get-info`,
                {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                }
            );

            const data: ApiResponse<User & { accessToken: string }> = await response.json();
            return { ...data };
        } catch (error) {

            console.error('Get info : ' + error);
            throw new Error('Error Get info : ' + error);
        }
    };

    findUsersByText = async (text: string): Promise<ApiResponse<User[]>> => {
        try {
            const response = await this.fetch(
                `${env.API_URL}user?text=${text}`,
                {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                }
            );

            const data: ApiResponse<User[]> = await response.json();
            return { ...data };
        } catch (error) {

            console.error('Find users by text : ' + error);
            throw new Error('Error Find users by text : ' + error);
        }
    }


    findUserById = async (id: string): Promise<ApiResponse<User>> => {
        try {
            const response = await this.fetch(
                `${env.API_URL}user/${id}`,
                {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                }
            );

            const data: ApiResponse<User> = await response.json();
            return { ...data };
        } catch (error) {

            console.error('Find users by text : ' + error);
            throw new Error('Error Find users by text : ' + error);
        }
    }
}