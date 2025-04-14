// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { type knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    users: {
      id: string
      name: string
      email: string
      password: string
      created_at: string
      updated_at: string
    }
  }
}
