import 'dotenv/config'
import { knex as setupKnex, type Knex } from 'knex'
import { env } from './env'

const configDB = env.DATABASE_CLIENT === 'sqlite' ? { filename: env.DATABASE_URL } : env.DATABASE_URL

export const config: Knex.Config = {
  client: env.DATABASE_CLIENT,
  connection: configDB,
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations'
  }
}

export const knex = setupKnex(config)
