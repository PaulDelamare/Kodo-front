import { env } from '$env/dynamic/private';
import type { ApiResponse } from '$lib/Models/response.model';
import type { Video } from '$lib/Models/video.model';
import { Api } from './api.server';

export default class VideoApi extends Api {
     create = async (formData: FormData): Promise<ApiResponse<Video>> => {
          try {
               const response = await this.fetch(
                    `${env.API_URL}video`,
                    {
                         method: 'POST',
                         body: formData,
                         credentials: 'include'
                    }
               );

               const data: ApiResponse<Video> = await response.json();
               return { ...data };
          } catch (error) {

               console.error('Error creating video: ' + error);
               throw new Error('Error creating video: ' + error);
          }
     };

     findAllUserVideo = async (): Promise<ApiResponse<Video[]>> => {
          try {
               const response = await this.fetch(
                    `${env.API_URL}video`,
                    {
                         method: 'GET',
                         credentials: 'include'
                    }
               );

               const data: ApiResponse<Video[]> = await response.json();
               return { ...data };
          } catch (error) {

               console.error('Get info : ' + error);
               throw new Error('Error Get info : ' + error);
          }
     };

     findVideoById = async (id: string): Promise<ApiResponse<Video>> => {
          try {
               const response = await this.fetch(
                    `${env.API_URL}video/${id}`,
                    {
                         method: 'GET',
                         credentials: 'include'
                    }
               );

               const data: ApiResponse<Video> = await response.json();
               return { ...data };
          } catch (error) {

               console.error('Get info : ' + error);
               throw new Error('Error Get info : ' + error);
          }
     };

     findAllVideoInfinite = async (page: number, pageSize: number = 20, category?: 'graphisme' | '3d-art' | 'ui-ux'): Promise<ApiResponse<Video[]>> => {
          try {

               let url = `${env.API_URL}video-all?page=${page}&pageSize=${pageSize}`;
               if (category) {
                    url += `&categorie=${category}`;
               }

               const response = await this.fetch(
                    url,
                    {
                         method: 'GET',
                         headers: {
                              'Content-Type': 'application/json'
                         },
                         credentials: 'include',
                    }
               );

               const data: ApiResponse<Video[]> = await response.json();

               return { ...data };

          } catch (error) {
               console.error(`findAllVideoInfinite : ${error}`);
               throw new Error(`Error findAllVideoInfinite : ${error}`);
          }
     };
}