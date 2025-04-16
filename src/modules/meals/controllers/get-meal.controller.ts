import type { FastifyReply, FastifyRequest } from 'fastify'
import { knex } from '@/db'

type GetMealRequest = FastifyRequest<{
  Params: {
    id: string
  }
}>

export class GetMealController {
  async handle(req: GetMealRequest, reply: FastifyReply) {
    const { id } = req.params
    const userId = req.user.id

    const result = await knex('meals')
      .select('id', 'name', 'description', 'is_on_diet', 'occurred_at')
      .where({
        id,
        user_id: userId,
      })
      .first()

    if (!result) {
      return reply.status(404).send({
        message: 'Meal not found',
      })
    }

    const meal = {
      id: result.id,
      name: result.name,
      isOnDiet: result.is_on_diet,
      description: result.description,
      occurredAt: new Date(result.occurred_at).toISOString(),
    }

    reply.status(200).send({
      meal,
    })
  }
}
