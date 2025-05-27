import type { User } from "./user.model";

export interface Conversation {
    conversationId: string;
    user: Pick<User, 'id' | 'name' | 'firstname' | 'email'>,
    lastMessage: {
        id: string;
        content: string;
        createdAt: Date;
        senderId: string;
        isView: boolean;

    } | null;
}
