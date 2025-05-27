import type { User } from "./user.model";

export interface Video {
     id: string;
     title: string;
     categorie: string;
     videoUrl: string;
     thumbnailUrl: string;
     viewCount: number;
     user_id: string;
     createdAt: Date;
     updatedAt: Date;
     user: Omit<User, 'createdAt' | 'updatedAt'>;
     _count: {
          views: number;
     }
}