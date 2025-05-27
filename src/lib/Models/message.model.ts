export interface Message {
    id: string;
    content: string;
    createdAt: string;
    conversationId: string;
    isView: boolean;
    senderId: string;
    sender?: {
        email: string;
        firstname: string;
        id: string;
        name: string;
    };
}