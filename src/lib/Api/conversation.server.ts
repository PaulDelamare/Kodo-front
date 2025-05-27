import { env } from '$env/dynamic/private';
import type { Conversation } from '$lib/Models/conversation.model';
import type { Message } from '$lib/Models/message.model';
import type { ApiResponse } from '$lib/Models/response.model';
import { Api } from './api.server';

export default class ConversationApi extends Api {
    findAllUserConversation = async (): Promise<ApiResponse<Conversation[]>> => {
        try {
            const response = await this.fetch(
                `${env.API_URL}conversation`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                }
            );

            const data: ApiResponse<Conversation[]> = await response.json();
            return { ...data };
        } catch (error) {

            console.error('Error creating video: ' + error);
            throw new Error('Error creating video: ' + error);
        }
    };

    findConversationByUserId = async (userId: string): Promise<ApiResponse<{ id: string }>> => {
        try {
            const response = await this.fetch(
                `${env.API_URL}conversation/${userId}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                }
            );

            const data: ApiResponse<{ id: string }> = await response.json();
            return { ...data };
        } catch (error) {

            console.error('Error finding conversation by user ID: ' + error);
            throw new Error('Error finding conversation by user ID: ' + error);
        }
    };

    findAllMessagesByConversationId = async (conversationId: string): Promise<ApiResponse<Message[]>> => {
        try {
            const response = await this.fetch(
                `${env.API_URL}conversation-messages/${conversationId}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                }
            );

            const data: ApiResponse<Message[]> = await response.json();
            return { ...data };
        } catch (error) {

            console.error('Error finding messages by conversation ID: ' + error);
            throw new Error('Error finding messages by conversation ID: ' + error);
        }
    };

    sendMessage = async (conversationId: string, content: string): Promise<ApiResponse<{ id: string }>> => {
        try {
            const response = await this.fetch(
                `${env.API_URL}send-message/${conversationId}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({ content })
                }
            );

            const data: ApiResponse<{ id: string }> = await response.json();
            return { ...data };
        } catch (error) {

            console.error('Error sending message: ' + error);
            throw new Error('Error sending message: ' + error);
        }
    };

    checkConversationExists = async (id: string): Promise<ApiResponse<{
        conversationId: string;
        otherUser: {
            id: string;
            name: string;
            firstname: string;
            email: string;
        }
    }>> => {
        try {
            const response = await this.fetch(
                `${env.API_URL}check-conversation/${id}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                }
            );

            const data: ApiResponse<{
                conversationId: string;
                otherUser: {
                    id: string;
                    name: string;
                    firstname: string;
                    email: string;
                }
            }> = await response.json();
            return { ...data };
        } catch (error) {

            console.error('Error checking conversation existence: ' + error);
            throw new Error('Error checking conversation existence: ' + error);
        }

    }
}