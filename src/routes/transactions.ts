import { type FastifyInstance } from 'fastify'
import { randomUUID } from 'node:crypto'
import { z } from 'zod'
import { knex } from '../db'

export const transactionsRoutes = async (app: FastifyInstance): Promise<any> => {
  app.get('/', async (req, reply) => {
    const transaction = await knex('transactions').select('*')

    return transaction
  })

  app.post('/', async (req, reply): Promise<void> => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit'])
    })

    const { title, amount, type } = createTransactionBodySchema.parse(req.body)

    await knex('transactions')
      .insert({
        id: randomUUID(),
        title,
        amount: type === 'credit' ? amount : amount * -1
      })

    return await reply.code(201).send()
  })
}
