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

    meals: {
      id: string
      user_id: string
      name: string
      description: string
      is_on_diet: boolean
      occurred_at: string
      created_at: string
      updated_at: string
    }
  }
}
