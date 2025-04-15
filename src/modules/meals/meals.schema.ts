import { z } from 'zod'

export const registerMealRouteSchema = z.object({
  name: z.string(),
  description: z.string(),
  isOnDiet: z.boolean(),
  occurredAt: z.string(),
})

export const registerMealRouteResponse = z.null()

export type RegisterMealInput = z.infer<typeof registerMealRouteSchema>
export type RegisterMealRouteResponse = z.infer<
  typeof registerMealRouteResponse
>
