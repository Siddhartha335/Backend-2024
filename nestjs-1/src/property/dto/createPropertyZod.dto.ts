import { z } from "zod";

export const createPropertySchema = z.object({
    id: z.number().positive(),
    name: z.string().min(2).max(10),
    location: z.string()
}).required();

export type CreatePropertyZodDto = z.infer<typeof createPropertySchema>;