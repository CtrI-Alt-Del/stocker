import { z } from 'zod'

import { AppError } from '@stocker/core/errors'
import {
  appModeSchema,
  integerSchema,
  stringSchema,
  urlSchema,
} from '@stocker/validation/schemas'

export const envSchema = z.object({
  port: integerSchema.default(3333),
  mode: appModeSchema,
  supabaseKey: stringSchema,
  databaseUrl: stringSchema,
  directUrl: urlSchema,
  supabaseUrl: stringSchema,
  jwtSecret: stringSchema,
})

const validation = envSchema.safeParse({
  port: process.env.PORT,
  mode: process.env.MODE,
  databaseUrl: process.env.DATABASE_URL,
  directUrl: process.env.DIRECT_URL,
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseKey: process.env.SUPABASE_KEY,
})

if (!validation.success) {
  throw new AppError('Env Error', validation.error.issues.join(', '))
}

export const ENV = validation.data
