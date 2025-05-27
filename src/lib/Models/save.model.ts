export interface SaveVideo {
     userId: string;
     videoId: string;
     savedAt: string;
     video: {
          id: string;
          title: string;
          createdAt: string;
          user_id: string;
          thumbnailUrl: string;
          videoUrl: string;
          viewCount: number;
          _count: { views: 1 }
     },
     user: {
          id: string;
          name: string;
          email: string;
          firstname: string;
     }
}
