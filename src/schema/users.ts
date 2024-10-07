import { PassThrough } from 'stream';
import { z } from 'zod';

const signupSchema = z.object({
    name: z.string().min(3).max(255),
    email: z.string().email(),
    Password: z.string().min(6),
});