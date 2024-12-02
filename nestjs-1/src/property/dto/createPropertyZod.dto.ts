import { z } from "zod";


export const createPropertySchema = z.object({
    id: z.number().positive().optional(),
    name: z.string().min(2).max(30),
    description: z.string(),
    price:z.number()
})

export type CreatePropertyZodDto = z.infer<typeof createPropertySchema>;