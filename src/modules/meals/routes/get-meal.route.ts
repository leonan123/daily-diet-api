import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { GetMealController } from '../controllers/get-meal.controller'
import { getMealRouteResponse } from '../meals.schema'
import { z } from 'zod'

export async function getMealRoute(app: FastifyInstance) {
  const getMealController = new GetMealController()

  app.withTypeProvider<ZodTypeProvider>().get(
    '/:id',
    {
      schema: {
        params: z.object({
          id: z.string().uuid(),
        }),
        response: {
          200: getMealRouteResponse,
        },
      },
      preHandler: [app.authenticate],
    },
    getMealController.handle,
  )
}
