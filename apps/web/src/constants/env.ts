import z from 'zod'

import { AppError } from '@stocker/core/errors'
import { urlSchema } from '@stocker/validation/schemas'

const envSchema = z.object({
  appUrl: urlSchema,
  serverUrl: urlSchema,
})

const validation = envSchema.safeParse({
  appUrl: process.env.NEXT_PUBLIC_APP_URL,
  serverUrl: process.env.NEXT_PUBLIC_SERVER_URL,
})

if (!validation.success)
  throw new AppError('Env Error', validation.error.issues.join(', '))

export const ENV = validation.data
