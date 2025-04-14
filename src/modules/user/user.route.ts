import type { FastifyInstance } from 'fastify'
import { createUserRoute } from './routes/create-user.route'

export async function userRoutes(app: FastifyInstance) {
  await createUserRoute(app)
}
