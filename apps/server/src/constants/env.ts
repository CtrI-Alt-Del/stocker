import { z } from 'zod'

import { EnvError } from '@stocker/core/errors'
import {
  appModeSchema,
  emailSchema,
  integerSchema,
  stringSchema,
  urlSchema,
} from '@stocker/validation/schemas'

export const envSchema = z.object({
  port: integerSchema.default(3333),
  mode: appModeSchema,
  domain: stringSchema,
  supabaseKey: stringSchema,
  databaseUrl: urlSchema,
  supabaseUrl: urlSchema,
  directUrl: urlSchema,
  webAppUrl: urlSchema,
  jwtSecret: stringSchema,
  resendApiKey: stringSchema,
  senderName: stringSchema,
  senderEmail: emailSchema,
})

const validation = envSchema.safeParse({
  port: process.env.PORT,
  mode: process.env.MODE,
  domain: process.env.DOMAIN,
  databaseUrl: process.env.DATABASE_URL,
  directUrl: process.env.DIRECT_URL,
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseKey: process.env.SUPABASE_KEY,
  jwtSecret: process.env.JWT_SECRET,
  resendApiKey: process.env.RESEND_API_KEY,
  senderName: process.env.SENDER_NAME,
  senderEmail: process.env.SENDER_EMAIL,
  webAppUrl: process.env.WEB_APP_URL,
})

if (!validation.success) {
  throw new EnvError(validation.error.flatten().fieldErrors)
}

export const ENV = validation.data
