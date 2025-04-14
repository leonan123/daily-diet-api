import type { FastifyInstance } from 'fastify'
import { $ref } from '../user.schema'
import { CreateUserController } from '../controllers/create-user.controller'

export async function createUserRoute(app: FastifyInstance) {
  const createUserController = new CreateUserController()

  app.post(
    '/create',
    {
      schema: {
        body: $ref('createUserSchema'),
        response: {
          201: $ref('createUserSchemaResponse'),
        },
      },
      preHandler: [app.authenticate],
    },
    createUserController.handle,
  )
}
