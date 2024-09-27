import z from 'zod'

import { Datetime } from '@stocker/core/libs'

import { nonZeroIntegerSchema } from './non-zero-integer-schema'
import { stringSchema } from './string-schema'
import { integerSchema } from './integer-schema'

export const batchSchema = z
  .object({
    code: stringSchema,
    itemsCount: nonZeroIntegerSchema,
    expirationDate: z.coerce
      .string()
      .transform((value) => {
        if (!value) return undefined
        return new Date(value)
      })
      .optional()
      .refine(
        (value) =>
          value
            ? new Datetime(new Datetime(value).addDays(1)).isSameOrAfter(new Date())
            : true,
        {
          message: 'Somente datas futuras',
        },
      ),
    maximumDaysToExipiration: integerSchema.optional(),
  })
  .refine(
    (data) => (data.expirationDate ? Boolean(data.maximumDaysToExipiration) : true),
    {
      message: 'Número dias para notificação de expiração não definido',
      path: ['expirationDate'],
    },
  )
  .refine(
    (data) => (data.maximumDaysToExipiration ? Boolean(data.expirationDate) : true),

    {
      message: 'Data de validade não definida',
      path: ['maximumDaysToExipiration'],
    },
  )
