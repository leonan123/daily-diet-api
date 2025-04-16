import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { GetMealsController } from '../controllers/get-meals.controller'
import { getMealsRouteResponse } from '../meals.schema'

export async function getMealsRoute(app: FastifyInstance) {
  const getMealsController = new GetMealsController()

  app.withTypeProvider<ZodTypeProvider>().get(
    '/',
    {
      schema: {
        response: {
          200: getMealsRouteResponse,
        },
      },
      preHandler: [app.authenticate],
    },
    getMealsController.handle,
  )
}
