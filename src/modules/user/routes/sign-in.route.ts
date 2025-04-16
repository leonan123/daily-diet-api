import type { FastifyInstance } from 'fastify'
import { signInSchema, signInSchemaResponse } from '../user.schema'
import { SignInController } from '../controllers/sign-in.controller'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

export async function signInRoute(app: FastifyInstance) {
  const signInController = new SignInController()

  app.withTypeProvider<ZodTypeProvider>().post(
    '/sign-in',
    {
      schema: {
        body: signInSchema,
        response: {
          200: signInSchemaResponse,
        },
      },
    },
    signInController.handle,
  )
}
