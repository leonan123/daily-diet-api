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
  // app.post(
  //   '/sign-in',
  //   {
  //     schema: {
  //       body: $ref('logInSchema'),
  //       response: {
  //         200: $ref('logInSchemaResponse'),
  //       },
  //     },
  //   },
  //   signInController.handle,
  // )
}
