import type { FastifyInstance } from 'fastify'
import { registerMealRoute } from './routes/register-meal.route'
import { updateMealRoute } from './routes/update-meal.route'
import { deleteMealRoute } from './routes/delete-meal.route'

export async function mealsRoutes(app: FastifyInstance) {
  await registerMealRoute(app)
  await updateMealRoute(app)
  await deleteMealRoute(app)
}
