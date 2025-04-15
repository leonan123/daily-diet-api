import { z } from 'zod'

export const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
})

export const createUserSchemaResponse = z.object({
  access_token: z.string(),
})

export type CreateUserInput = z.input<typeof createUserSchema>
export type CreateUserSchemaResponse = z.input<typeof createUserSchemaResponse>

export const signInSchema = z.object({
  email: z.string().email({
    message: 'Email is required',
  }),
  password: z.string().min(6),
})

export const signInSchemaResponse = z.object({
  access_token: z.string(),
})

export type LogInInput = z.input<typeof signInSchema>
export type LogInSchemaResponse = z.input<typeof signInSchemaResponse>
