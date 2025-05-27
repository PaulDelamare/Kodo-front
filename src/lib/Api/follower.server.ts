import { env } from '$env/dynamic/private';
import type { Conversation } from '$lib/Models/conversation.model';
import type { ApiResponse } from '$lib/Models/response.model';
import { Api } from './api.server';

export default class FollowerApi extends Api {
     followUser = async (userId: string): Promise<ApiResponse<Conversation[]>> => {
          try {
               const response = await this.fetch(
                    `${env.API_URL}follow/${userId}`,
                    {
                         method: 'POST',
                         headers: {
                              'Content-Type': 'application/json'
                         },
                         credentials: 'include',
                    }
               );

               const data: ApiResponse<Conversation[]> = await response.json();
               return { ...data };
          } catch (error) {

               console.error('Error following user: ' + error);
               throw new Error('Error following user: ' + error);
          }
     };

     checkFollow = async (userId: string): Promise<ApiResponse<{ isFollowing: boolean }>> => {
          try {
               const response = await this.fetch(
                    `${env.API_URL}follow/${userId}`,
                    {
                         method: 'GET',
                         headers: {
                              'Content-Type': 'application/json'
                         },
                         credentials: 'include',
                    }
               );

               const data: ApiResponse<{ isFollowing: boolean }> = await response.json();
               return { ...data };
          } catch (error) {

               console.error('Error checking follow status: ' + error);
               throw new Error('Error checking follow status: ' + error);
          }
     }
}