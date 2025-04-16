import type { FastifyInstance } from 'fastify'
import { registerMealRoute } from './routes/register-meal.route'
import { updateMealRoute } from './routes/update-meal.route'
import { deleteMealRoute } from './routes/delete-meal.route'
import { getMealsRoute } from './routes/get-meals.route'
import { getMealRoute } from './routes/get-meal.route'
import { getUserMealsMetricsRoute } from './routes/get-user-meals-metrics.route'

export async function mealsRoutes(app: FastifyInstance) {
  await registerMealRoute(app)
  await updateMealRoute(app)
  await deleteMealRoute(app)
  await getMealsRoute(app)
  await getMealRoute(app)
  await getUserMealsMetricsRoute(app)
}
