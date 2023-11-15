import { type FastifyInstance } from 'fastify'
import { transactionsRoutes } from './transactions'

export const routes = async (app: FastifyInstance): Promise<void> => {
  await app.register(transactionsRoutes, { prefix: 'transactions' })
}
