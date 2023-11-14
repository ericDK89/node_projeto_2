import { type FastifyInstance } from 'fastify'
import { randomUUID } from 'node:crypto'
import { z } from 'zod'
import { knex } from '../db'

export const transactionsRoutes = async (app: FastifyInstance): Promise<any> => {
  app.get('/', async (request, reply) => {
    const transaction = await knex('transactions').select('*')

    return { transaction }
  })

  app.get('/:id', async (request, reply) => {
    const getTransactionParamsSchema = z.object({
      id: z.string().uuid()
    })

    const { id } = getTransactionParamsSchema.parse(request.params)

    const transaction = await knex('transactions')
      .where('id', id)
      .first()

    return {
      transaction
    }
  })

  app.get('/summary', async (request, reply) => {
    const summary = await knex('transactions')
      .sum('amount', { as: 'amount' })
      .first()

    return {
      summary
    }
  })

  app.post('/', async (request, reply): Promise<void> => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit'])
    })

    const { title, amount, type } = createTransactionBodySchema.parse(request.body)

    await knex('transactions')
      .insert({
        id: randomUUID(),
        title,
        amount: type === 'credit' ? amount : amount * -1
      })

    return await reply.code(201).send()
  })
}
