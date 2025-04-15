import type { FastifyInstance } from 'fastify'
import { registerMealRoute } from './routes/register-meal.route'

export async function mealsRoutes(app: FastifyInstance) {
  await registerMealRoute(app)
}
