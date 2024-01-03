import * as z from 'zod';

export const SignInFormSchema = z.object({
    username: z.string().min(6),
    email: z.string()
    .min(8, 'Email is required').email('Invalid Email'),
    password : z.string()
    .min(6, 'Password must have than 6 characters'),
})
export const SignUpFormSchema = z.object({
    name: z.string()
    .min(2, 'Name is required'),
    email: z.string()
    .min(8, 'Email is required').email('Invalid Email'),
    password : z.string()
    .min(6, 'Password must have than 6 characters'),
})
export type TSignUpSchema = z.infer<typeof SignInFormSchema>