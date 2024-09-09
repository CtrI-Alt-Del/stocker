import z from 'zod'

import { AppError } from '@stocker/core/errors'

const envSchema = z.object({
  appUrl: z.string(),
})

const validation = envSchema.safeParse({
  appUrl: process.env.NEXT_PUBLIC_APP_URL,
})

if (!validation.success)
  throw new AppError('Env Error', validation.error.issues.join(', '))

export const ENV = validation.data
