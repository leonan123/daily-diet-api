import fastify, { type FastifyReply, type FastifyRequest } from 'fastify'
import { userRoutes } from './modules/user/user.route'
import { userSchemas } from './modules/user/user.schema'
import fastifyJwt, { type FastifyJWT } from '@fastify/jwt'
import { env } from './env'

export const app = fastify()

for (const schema of [...userSchemas]) {
  app.addSchema(schema)
}

app.register(fastifyJwt, { secret: env.JWT_SECRET })

app.addHook('preHandler', (req, _, next) => {
  req.jwt = app.jwt
  return next()
})

app.decorate(
  'authenticate',
  async (req: FastifyRequest, reply: FastifyReply) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      return reply.status(401).send({
        message: 'Unauthenticated',
      })
    }

    const [, token] = authHeader.split(' ')

    try {
      const decoded = req.jwt.verify<FastifyJWT['user']>(token)
      req.user = decoded
    } catch {
      return reply.status(401).send({
        message: 'Unauthenticated',
      })
    }
  },
)

app.register(userRoutes, {
  prefix: '/api/users',
})
