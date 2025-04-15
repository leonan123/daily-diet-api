import type { FastifyReply, FastifyRequest } from 'fastify'
import { knex } from '../../../db'
import bcryptjs from 'bcryptjs'
import type { LogInInput } from '../user.schema'

type SignInRequest = FastifyRequest<{
  Body: LogInInput
}>

export class SignInController {
  async handle(req: SignInRequest, reply: FastifyReply) {
    const { email, password } = req.body

    const user = await knex('users').where('email', email).first()
    const passwordMatch = user && bcryptjs.compareSync(password, user.password)

    if (!user || !passwordMatch) {
      return reply.status(400).send({
        message: 'Email or password incorrect.',
      })
    }

    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
    }

    const token = req.jwt.sign(payload, {
      expiresIn: '1d',
    })

    return reply.status(200).send({
      access_token: token,
    })
  }
}
