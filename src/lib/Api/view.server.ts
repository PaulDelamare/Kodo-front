import { env } from '$env/dynamic/private';
import type { ApiResponse } from '$lib/Models/response.model';
import { Api } from './api.server';

export default class ViewApi extends Api {
     viewVideo = async (videoId: string): Promise<ApiResponse> => {
          try {
               const response = await this.fetch(
                    `${env.API_URL}view/${videoId}`,
                    {
                         method: 'POST',
                         headers: {
                              'Content-Type': 'application/json'
                         },
                         credentials: 'include',
                    }
               );

               const data: ApiResponse = await response.json();
               return { ...data };
          } catch (error) {
               console.error('Error saving video view: ' + error);
               throw new Error('Error saving video view: ' + error);
          }
     };

     findCountViewVideo = async (): Promise<ApiResponse<{ views: number }>> => {
          try {
               const response = await this.fetch(
                    `${env.API_URL}view`,
                    {
                         method: 'GET',
                         credentials: 'include'
                    }
               );

               const data: ApiResponse<{ views: number }> = await response.json();
               return { ...data };
          } catch (error) {

               console.error('Error fetching view count: ' + error);
               throw new Error('Error fetching view count: ' + error);
          }
     };
}