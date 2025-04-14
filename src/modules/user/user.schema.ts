import { buildJsonSchemas } from 'fastify-zod'
import { z } from 'zod'

const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
})

const createUserSchemaResponse = z.object({
  access_token: z.string(),
})

export type CreateUserInput = z.input<typeof createUserSchema>
export type RegisterUserSchemaResponse = z.input<
  typeof createUserSchemaResponse
>

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
  createUserSchema,
  createUserSchemaResponse,
})
