import { z } from 'zod'

import { AppError } from '@stocker/core/errors'

export const envSchema = z.object({
  port: z.coerce.number().default(3333),
  mode: z.enum(['dev', 'prod']).default('dev'),
  supabaseKey: z.string(),
  databaseUrl: z.string().url(),
  directUrl: z.string().url(),
  supabaseUrl: z.string().url(),
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
