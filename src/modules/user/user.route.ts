import type { FastifyInstance } from 'fastify'
import { createUserRoute } from './routes/create-user.route'
import { signInRoute } from './routes/sign-in.route'

export async function userRoutes(app: FastifyInstance) {
  await createUserRoute(app)
  await signInRoute(app)
}
