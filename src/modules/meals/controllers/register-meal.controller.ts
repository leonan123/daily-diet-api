import type { FastifyReply, FastifyRequest } from 'fastify'
import type { RegisterMealInput } from '../meals.schema'
import { randomUUID } from 'node:crypto'
import { knex } from '../../../db'

type RegisterMealRequest = FastifyRequest<{
  Body: RegisterMealInput
}>

export class RegisterMealController {
  async handle(req: RegisterMealRequest, reply: FastifyReply) {
    const { name, description, occurredAt, isOnDiet } = req.body
    const userId = req.user.id

    await knex('meals').insert({
      id: randomUUID(),
      user_id: userId,
      name,
      description,
      occurred_at: occurredAt,
      is_on_diet: isOnDiet,
    })

    reply.status(201).send()
  }
}
