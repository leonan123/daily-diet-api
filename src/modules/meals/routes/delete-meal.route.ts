import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { DeleteMealController } from '../controllers/delete-meal.controller'

export async function deleteMealRoute(app: FastifyInstance) {
  const deleteMealController = new DeleteMealController()

  app.withTypeProvider<ZodTypeProvider>().delete(
    '/delete/:id',
    {
      schema: {
        params: z.object({
          id: z.string().uuid(),
        }),
        response: {
          204: z.null(),
        },
      },
      preHandler: [app.authenticate],
    },
    deleteMealController.handle,
  )
}
