import type { FastifyReply, FastifyRequest } from 'fastify'
import type { CreateUserInput } from '../user.schema'
import { knex } from '../../../db'
import bcryptjs from 'bcryptjs'
import { randomUUID } from 'node:crypto'

type CreateUserRequest = FastifyRequest<{
  Body: CreateUserInput
}>

export class CreateUserController {
  async handle(req: CreateUserRequest, reply: FastifyReply) {
    const { name, email, password } = req.body

    const user = await knex('users').where('email', email).first()

    if (user) {
      return reply.status(400).send({
        message: 'User already exists',
      })
    }

    const passwordHash = await bcryptjs.hash(password, 10)

    const result = await knex('users')
      .insert({
        id: randomUUID(),
        name,
        email,
        password: passwordHash,
      })
      .returning('id')

    const userId = result[0].id

    const payload = {
      id: userId,
      name,
      email,
    }

    const token = req.jwt.sign(payload, {
      expiresIn: '1d',
    })

    return reply.status(201).send({
      access_token: token,
    })
  }
}
