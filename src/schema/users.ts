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