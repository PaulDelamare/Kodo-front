import type { User } from "./user.model";
import type { Video } from "./video.model";

export interface Comment {
    id: string;
    comment: string;
    user_id: string;
    user?: User;
    video_id: string;
    video?: Video;
    createdAt: Date;
    updatedAt: Date;
}