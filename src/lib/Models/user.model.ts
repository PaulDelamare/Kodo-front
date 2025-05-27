import type { Video } from "./video.model";

export interface User {
    id: string;
    firstname: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    videos?: Video[];
}