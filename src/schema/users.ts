import { z } from 'zod';

export const SignUpSchema = z.object({
    name: z.string().min(3).max(255),
    email: z.string().email(),
    password: z.string().min(6),
});

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export const AddressSchema = z.object({
    lineOne: z.string(),
    lineTwo: z.string().optional(),
    pincode: z.string(),
    country: z.string(),
    city: z.string(),
});

export const ParamsSchema = z.object({
    id: z.coerce.number(),
    skip: z.number().optional(),
    take: z.number().optional(),
});