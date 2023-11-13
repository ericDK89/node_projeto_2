import { randomUUID } from 'crypto'
import fastify from 'fastify'
import { knex } from './db'
import { env } from './env'

const app = fastify()

app.post('/', async (req, reply) => {
  await knex('transactions')
    .insert({
      id: randomUUID(),
      title: 'Transaction test',
      amount: 1000
    })

  await reply.code(201).send()
})

app.get('/', async (req, reply) => {
  const transactions = await knex('transactions').select('*')

  return await reply.code(200).send(transactions)
})

void app.listen({
  port: env.PORT
}).then(() => {
  console.log(`Server listening on ${env.PORT}`)
})
