import type { FastifyReply, FastifyRequest } from 'fastify'
import type { UpdateMealInput } from '../meals.schema'
import { knex } from '../../../db'

type UpdateMealRequest = FastifyRequest<{
  Body: UpdateMealInput
  Params: {
    id: string
  }
}>

export class UpdateMealController {
  async handle(req: UpdateMealRequest, reply: FastifyReply) {
    const { id } = req.params
    const { name, description, isOnDiet, occurredAt } = req.body
    const userId = req.user.id

    const meal = await knex('meals')
      .where({
        id,
        user_id: userId,
      })
      .first()

    if (!meal) {
      return reply.status(404).send({
        message: 'Meal not found',
      })
    }

    await knex('meals').where('id', id).update({
      name,
      description,
      is_on_diet: isOnDiet,
      occurred_at: occurredAt,
    })

    reply.status(204).send()
  }
}
