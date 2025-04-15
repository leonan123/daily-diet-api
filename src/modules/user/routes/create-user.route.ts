import type { FastifyInstance } from 'fastify'
import { createUserSchema, createUserSchemaResponse } from '../user.schema'
import { CreateUserController } from '../controllers/create-user.controller'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

export async function createUserRoute(app: FastifyInstance) {
  const createUserController = new CreateUserController()

  app.withTypeProvider<ZodTypeProvider>().post(
    '/create',
    {
      schema: {
        body: createUserSchema,
        response: {
          201: createUserSchemaResponse,
        },
      },
    },
    createUserController.handle,
  )
}
