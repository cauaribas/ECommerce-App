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

export const QueryParamsSchema = z.object({
    page: z.number().optional(),
    pageSize: z.number().optional(),
    orderBy: z.string().optional(),
});

export const ParamsSchema = z.object({
    id: z.number(),
});

export const SearchSchema = z.object({
    q: z.string(),
});