import z from 'zod'

import { descriptionSchema } from './description-schema'
import { dateSchema } from './date-schema'

export const inventoryMovementSchema = z.object({
  remark: z
    .string()
    .transform((value) => (value === '' ? undefined : value))
    .optional(),
  registeredAt: dateSchema,
})
