import { z } from "zod";

export const commentSchema = z.object({
    comment: z.string().min(1, 'Le commentaire ne peut pas être vide').max(500, 'Le commentaire ne doit pas dépasser 500 caractères'),
});