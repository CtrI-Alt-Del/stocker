import { z } from 'zod'

import { EnvError } from '@stocker/core/errors'
import { urlSchema } from '@stocker/validation/schemas'

const envSchema = z.object({
  appUrl: urlSchema,
  serverUrl: urlSchema,
  resendApiKey: z.any(),
  senderEmail: z.any(),
  senderName: z.any(),
})

const validation = envSchema.safeParse({
  appUrl: process.env.NEXT_PUBLIC_APP_URL,
  serverUrl: process.env.NEXT_PUBLIC_SERVER_URL,
  resendApiKey: process.env.RESEND_API_KEY,
  senderName: process.env.SENDER_NAME,
  senderEmail: process.env.SENDER_EMAIL,
})

if (!validation.success) {
  throw new EnvError(validation.error.flatten().fieldErrors)
}

export const BROWSER_ENV = validation.data
