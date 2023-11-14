import fastify from 'fastify'
import { env } from './env'
import { route } from './routes'
import cookie from '@fastify/cookie'

const app = fastify()

void app.register(cookie)

void app.register(route, {
  prefix: 'transactions'
})

void app.listen({
  port: env.PORT
}).then(() => {
  console.log(`Server listening on ${env.PORT}`)
})
