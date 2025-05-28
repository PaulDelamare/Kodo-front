import { z } from "zod";

export const findConvSchema = z.object({
    userId: z.string().uuid()
});