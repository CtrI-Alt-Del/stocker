import { z } from 'zod'

export const stringSchema = z
  .string({ message: 'texto inválido' })
  .min(1, 'texto inválido')
