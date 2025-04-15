import type { FastifyInstance } from 'fastify'
import {
  registerMealRouteResponse,
  registerMealRouteSchema,
} from '../meals.schema'
import { RegisterMealController } from '../controllers/register-meal.controller'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

export async function registerMealRoute(app: FastifyInstance) {
  const registerMealController = new RegisterMealController()

  app.withTypeProvider<ZodTypeProvider>().post(
    '/register',
    {
      schema: {
        body: registerMealRouteSchema,
        response: {
          201: registerMealRouteResponse,
        },
      },
      preHandler: [app.authenticate],
    },
    registerMealController.handle,
  )
}
