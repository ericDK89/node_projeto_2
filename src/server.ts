import fastify from 'fastify'
import { knex } from './db'

const app = fastify()
const PORT = 3333

app.get('/hello', async (req, res) => {
  const tables = await knex('sqlite_schema').select('*')

  return tables
})

void app.listen({
  port: PORT
}).then(() => {
  console.log(`Server listening on ${PORT}`)
})
