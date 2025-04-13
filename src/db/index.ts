import setupKnex, { type Knex } from 'knex'

const migrationsDirectory = new URL('./migrations', import.meta.url).pathname

export const config: Knex.Config = {
  client: 'sqlite',
  connection: {
    filename: './db.sqlite',
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: migrationsDirectory.toString(),
  },
}

export const knex = setupKnex(config)
