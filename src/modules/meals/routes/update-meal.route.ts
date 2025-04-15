import type { FastifyInstance } from 'fastify'
import { updateMealRouteResponse, updateMealRouteSchema } from '../meals.schema'
import { UpdateMealController } from '../controllers/update-meal.controller'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

export async function updateMealRoute(app: FastifyInstance) {
  const updateMealController = new UpdateMealController()

  app.withTypeProvider<ZodTypeProvider>().put(
    '/update/:id',
    {
      schema: {
        params: z.object({
          id: z.string().uuid(),
        }),
        body: updateMealRouteSchema,
        response: {
          204: updateMealRouteResponse,
        },
      },
      preHandler: [app.authenticate],
    },
    updateMealController.handle,
  )
}
