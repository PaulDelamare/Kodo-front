import { env } from '$env/dynamic/private';
import type { Comment } from '$lib/Models/comment.model';
import type { ApiResponse } from '$lib/Models/response.model';
import type { Video } from '$lib/Models/video.model';
import { Api } from './api.server';

export default class CommentApi extends Api {
    publishComment = async (comment: Comment['comment'], video_id: Video['id']): Promise<ApiResponse<Comment>> => {
        try {
            const response = await this.fetch(
                `${env.API_URL}comment`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        comment,
                        video_id
                    })
                }
            );

            const data: ApiResponse<Comment> = await response.json();
            return { ...data };
        } catch (error) {

            console.error('PublishComment : ' + error);
            throw new Error('Error PublishComment : ' + error);
        }
    };

    findAllCommentsByVideoId = async (video_id: Video['id']): Promise<ApiResponse<Comment[]>> => {
        try {
            const response = await this.fetch(
                `${env.API_URL}comment/${video_id}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                }
            );

            const data: ApiResponse<Comment[]> = await response.json();
            return { ...data };
        } catch (error) {
            console.error('FindAllCommentsByVideoId : ' + error);
            throw new Error('Error FindAllCommentsByVideoId : ' + error);
        }
    };

    getAllProductByMerchantId = async (video_id: Video['id'], page: number, pageSize = 20): Promise<ApiResponse<Comment[]>> => {
        try {
            const response = await this.fetch(
                `${env.API_URL}comment/${video_id}?page=${page}&pageSize=${pageSize}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                }
            );

            const data: ApiResponse<Comment[]> = await response.json();
            return { ...data };
        } catch (error) {

            console.error('GetAllProductByMerchantId : ' + error);
            throw new Error('Error GetAllProductByMerchantId : ' + error);
        }
    };
}