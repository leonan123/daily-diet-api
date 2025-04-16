import { z } from 'zod'

// REGISTER MEAL
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

// UPDATE MEAL
export const updateMealRouteSchema = z
  .object({
    name: z.string().optional(),
    description: z.string().optional(),
    isOnDiet: z.boolean().optional(),
    occurredAt: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const haveFields = Object.keys(data).length > 0

    if (!haveFields) {
      ctx.addIssue({
        code: 'custom',
        message: 'Pelo menos um campo deve ser fornecido.',
      })
    }
  })

export const updateMealRouteResponse = z.null()

export type UpdateMealInput = z.infer<typeof updateMealRouteSchema>
export type UpdateMealRouteResponse = z.infer<typeof updateMealRouteResponse>

// GET MEALS
export const getMealsRouteResponse = z.object({
  mealsPerDay: z.record(
    z.string(),
    z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        isOnDiet: z.coerce.boolean(),
        description: z.string(),
        occurredAt: z.string(),
      }),
    ),
  ),
})

export type GetMealsRouteResponse = z.infer<typeof getMealsRouteResponse>

// GET MEAL
export const getMealRouteResponse = z.object({
  meal: z.object({
    id: z.string(),
    name: z.string(),
    isOnDiet: z.coerce.boolean(),
    description: z.string(),
    occurredAt: z.string(),
  }),
})

export type GetMealRouteResponse = z.infer<typeof getMealRouteResponse>

// GET USER MEALS METRICS
export const getUserMealsMetricsRouteResponse = z.object({
  metrics: z.object({
    totalMeals: z.number(),
    totalMealsOnDiet: z.number(),
    totalMealsOffDiet: z.number(),
    bestSequenceOnDiet: z.number(),
  }),
})

export type GetUserMealsMetricsRouteResponse = z.infer<
  typeof getUserMealsMetricsRouteResponse
>
