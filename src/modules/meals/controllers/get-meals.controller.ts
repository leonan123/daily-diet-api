import type { FastifyReply, FastifyRequest } from 'fastify'
import { knex } from '@/db'
import type { GetMealsRouteResponse } from '../meals.schema'

type GetMealsRequest = FastifyRequest

export class GetMealsController {
  async handle(req: GetMealsRequest, reply: FastifyReply) {
    const userId = req.user.id

    const meals = await knex('meals')
      .select('id', 'name', 'description', 'is_on_diet', 'occurred_at')
      .where('user_id', userId)

    const mealsPerDay = meals.reduce((acc, meal) => {
      const date = new Date(meal.occurred_at).toISOString().split('T')[0]

      if (!acc[date]) {
        acc[date] = []
      }

      acc[date].push({
        id: meal.id,
        name: meal.name,
        isOnDiet: meal.is_on_diet,
        description: meal.description,
        occurredAt: new Date(meal.occurred_at).toISOString(),
      })

      return acc
    }, {} as Record<string, GetMealsRouteResponse['mealsPerDay'][string]>)

    reply.status(200).send({
      mealsPerDay,
    })
  }
}
