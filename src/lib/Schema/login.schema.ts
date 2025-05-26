import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères').max(30, 'Le mot de passe ne doit pas dépasser 30 caractères')
});