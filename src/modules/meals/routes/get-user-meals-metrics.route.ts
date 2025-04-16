import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { GetUserMealsMetricsController } from '../controllers/get-user-meals-metrics.controller'
import { getUserMealsMetricsRouteResponse } from '../meals.schema'

export async function getUserMealsMetricsRoute(app: FastifyInstance) {
  const getUserMealsMetricsController = new GetUserMealsMetricsController()

  app.withTypeProvider<ZodTypeProvider>().get(
    '/metrics',
    {
      schema: {
        response: {
          200: getUserMealsMetricsRouteResponse,
        },
      },
      preHandler: [app.authenticate],
    },
    getUserMealsMetricsController.handle,
  )
}
