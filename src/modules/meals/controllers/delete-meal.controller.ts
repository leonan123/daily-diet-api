import type { FastifyReply, FastifyRequest } from 'fastify'
import { knex } from '../../../db'

type DeleteMealRequest = FastifyRequest<{
  Params: {
    id: string
  }
}>

export class DeleteMealController {
  async handle(req: DeleteMealRequest, reply: FastifyReply) {
    const { id } = req.params
    const userId = req.user.id

    const query = {
      id,
      user_id: userId,
    }

    const meal = await knex('meals').where(query).first()

    if (!meal) {
      return reply.status(404).send({
        message: 'Meal not found',
      })
    }

    await knex('meals').where(query).delete()

    reply.status(204).send()
  }
}
