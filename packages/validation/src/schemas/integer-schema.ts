import { z } from 'zod'

export const integerSchema = z.coerce
  .number({ message: 'número inválido' })
  .min(0, 'pelo menos maior ou igual a 0')
