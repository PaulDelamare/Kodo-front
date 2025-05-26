import { z } from "zod";

export const videoSchema = z.object({
     title: z.string()
          .min(1, 'Le titre est requis')
          .max(100, 'Le titre ne doit pas dépasser 100 caractères')
          .trim(),
     categorie: z.enum(['graphisme', '3d-art', 'ui-ux'], {
          errorMap: () => ({ message: 'La catégorie doit être graphisme, 3D-art ou ui-ux' })
     }),
     video: z
          .instanceof(File, { message: 'La vidéo est requise' })
          .refine(file => file.type.startsWith('video/'), {
               message: 'Le fichier doit être une vidéo',
          })
          .refine(file => file.size <= 100 * 1024 * 1024, {
               message: 'La taille de la vidéo ne doit pas dépasser 100 Mo',
          }),
});