import { z } from 'zod'

export const nonZeroIntegerSchema = z.coerce
  .number({ message: 'número inválido' })
  .min(1, 'pelo menos maior ou igual a 1')
