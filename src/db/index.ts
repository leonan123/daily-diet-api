import setupKnex, { type Knex } from 'knex'
import { env } from '../env'

const migrationsDirectory = new URL('./migrations', import.meta.url).pathname
const databaseFile = new URL(env.DATABASE_URL, import.meta.url).pathname

export const config: Knex.Config = {
  client: env.DATABASE_CLIENT,
  connection: {
    filename: databaseFile,
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: migrationsDirectory.toString(),
  },
}

export const knex = setupKnex(config)
