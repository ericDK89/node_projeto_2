import { type FastifyInstance } from 'fastify'
import { transactionsRoutes } from './transactions'

export const route = async (app: FastifyInstance): Promise<any> => {
  await app.register(transactionsRoutes)
}
