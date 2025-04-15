import fastify, { type FastifyReply, type FastifyRequest } from 'fastify'
import { userRoutes } from './modules/user/user.route'
import fastifyJwt, { type FastifyJWT } from '@fastify/jwt'
import { env } from './env'
import { mealsRoutes } from './modules/meals/meals.route'
import {
  hasZodFastifySchemaValidationErrors,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'

export const app = fastify()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyJwt, { secret: env.JWT_SECRET })

app.addHook('preHandler', (req, _, next) => {
  req.jwt = app.jwt
  return next()
})

app.setErrorHandler((err, req, reply) => {
  if (hasZodFastifySchemaValidationErrors(err)) {
    return reply.status(400).send({
      message: 'Validation error',
      issues: err.validation.flatMap((issue) => issue.params.issue),
    })
  }

  return reply.status(500).send({
    message: 'Internal server error',
  })
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

app.register(mealsRoutes, {
  prefix: '/api/meals',
})
