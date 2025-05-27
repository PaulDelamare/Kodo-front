import { env } from '$env/dynamic/private';
import type { ApiResponse } from '$lib/Models/response.model';
import type { SaveVideo } from '$lib/Models/save.model';
import { Api } from './api.server';

export default class SaveApi extends Api {
     saveVideo = async (videoId: string): Promise<ApiResponse> => {
          try {
               const response = await this.fetch(
                    `${env.API_URL}save/${videoId}`,
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

               console.error('Error saving video: ' + error);
               throw new Error('Error saving video: ' + error);
          }
     };

     checkSave = async (videoId: string): Promise<ApiResponse<{ isSaved: boolean }>> => {
          try {
               const response = await this.fetch(
                    `${env.API_URL}save-check/${videoId}`,
                    {
                         method: 'GET',
                         headers: {
                              'Content-Type': 'application/json'
                         },
                         credentials: 'include',
                    }
               );

               const data: ApiResponse<{ isSaved: boolean }> = await response.json();
               return { ...data };
          } catch (error) {

               console.error('Error checking save status: ' + error);
               throw new Error('Error checking save status: ' + error);
          }
     };

     findAllSavedVideos = async (): Promise<ApiResponse<SaveVideo[]>> => {
          try {
               const response = await this.fetch(
                    `${env.API_URL}save`,
                    {
                         method: 'GET',
                         credentials: 'include'
                    }
               );

               const data: ApiResponse<SaveVideo[]> = await response.json();
               return { ...data };
          } catch (error) {

               console.error('Error fetching saved videos: ' + error);
               throw new Error('Error fetching saved videos: ' + error);
          }
     };
}