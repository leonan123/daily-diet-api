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
