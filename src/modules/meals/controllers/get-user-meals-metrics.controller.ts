import type { FastifyReply, FastifyRequest } from 'fastify'
import { knex } from '@/db'

type GetUserMealsMetricsRequest = FastifyRequest

export class GetUserMealsMetricsController {
  async handle(req: GetUserMealsMetricsRequest, reply: FastifyReply) {
    const userId = req.user.id

    const totalMeals = await knex('meals')
      .where('user_id', userId)
      .orderBy('occurred_at', 'asc')

    const totalMealsOnDiet = totalMeals.filter((meal) => meal.is_on_diet).length

    const totalMealsOffDiet = totalMeals.filter(
      (meal) => !meal.is_on_diet,
    ).length

    let currentSequence = 0
    let longestSequence = 0

    for (const meal of totalMeals) {
      if (meal.is_on_diet) {
        currentSequence++
      } else {
        longestSequence = Math.max(longestSequence, currentSequence)
        currentSequence = 0
      }
    }

    longestSequence = Math.max(longestSequence, currentSequence)

    const metrics = {
      totalMeals: totalMeals.length,
      totalMealsOnDiet: totalMealsOnDiet,
      totalMealsOffDiet: totalMealsOffDiet,
      bestSequenceOnDiet: longestSequence,
    }

    reply.status(200).send({
      metrics,
    })
  }
}
