import { z } from 'zod';
import { loginSchema } from './auth.zod';

export type SigninSchema = z.infer<typeof loginSchema>;
// export type RegisterSchema = z.infer<typeof registerSchema>;
