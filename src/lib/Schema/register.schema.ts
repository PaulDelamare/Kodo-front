import { z } from "zod";

export const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères').max(30, 'Le mot de passe ne doit pas dépasser 30 caractères'),
    name: z.string().min(1, 'Le nom est requis'),
    password_confirmation: z.string().min(6, 'La confirmation du mot de passe doit contenir au moins 6 caractères').max(30, 'Le mot de passe ne doit pas dépasser 30 caractères'),
    firstname: z.string().min(1, 'Le prénom est requis')
}).refine(
    (data) => data.password === data.password_confirmation,
    {
        message: "Les mots de passe ne correspondent pas",
        path: ["password_confirmation"],
    }
)