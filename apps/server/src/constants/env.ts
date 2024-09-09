import { z } from 'zod'

import { AppError } from '@stocker/core/errors'

export const envSchema = z.object({
  port: z.coerce.number().default(3333),
  mode: z.enum(['dev', 'prod']).default('dev'),
})

const validation = envSchema.safeParse({
  port: process.env.PORT,
  mode: process.env.MODE,
})

if (!validation.success) {
  throw new AppError('Env Error', validation.error.issues.join(', '))
}

export const ENV = validation.data
