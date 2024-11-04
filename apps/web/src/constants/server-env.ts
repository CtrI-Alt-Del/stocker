import z from 'zod'

import { EnvError } from '@stocker/core/errors'
import { emailSchema, stringSchema } from '@stocker/validation/schemas'

const envSchema = z.object({
  passwordResetSecret: stringSchema,
  resendApiKey: stringSchema,
  senderName: stringSchema,
  senderEmail: emailSchema,
})

const validation = envSchema.safeParse({
  passwordResetSecret: process.env.PASSWORD_RESET_SECRET,
  resendApiKey: process.env.RESEND_API_KEY,
  senderName: process.env.SENDER_NAME,
  senderEmail: process.env.SENDER_EMAIL,
})

if (!validation.success) {
  throw new EnvError(validation.error.flatten().fieldErrors)
}

export const SERVER_ENV = validation.data
