import type { FastifyInstance } from 'fastify'
import { registerMealRoute } from './routes/register-meal.route'
import { updateMealRoute } from './routes/update-meal.route'

export async function mealsRoutes(app: FastifyInstance) {
  await registerMealRoute(app)
  await updateMealRoute(app)
}
