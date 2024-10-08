import { z } from "zod";

export const RegisterProductSchema = z.object({
    name: z.string(),
    description: z.string(),
    price: z.number().gt(0),
    tags: z.string().array(),
});

export const UpdateProductSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    price: z.number().gt(0).optional(),
    tags: z.string().array().optional(),
});