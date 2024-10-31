import z from 'zod'

import { AppError } from '@stocker/core/errors'
import { stringSchema, urlSchema } from '@stocker/validation/schemas'

const envSchema = z.object({
  appUrl: urlSchema,
  serverUrl: urlSchema,
  resendApiKey: z.any(),
  senderEmail: z.any(),
  senderName: z.any()
})
const validation = envSchema.safeParse({
  appUrl: process.env.NEXT_PUBLIC_APP_URL,
  serverUrl: process.env.NEXT_PUBLIC_SERVER_URL,
  resendApiKey: process.env.RESEND_API_KEY,
  senderName: process.env.SENDER_NAME,
  senderEmail: process.env.SENDER_EMAIL,
})

if (!validation.success) {
  const errorMessages = validation.error.issues
    .map((issue) => `Path: ${issue.path.join('.')}, Message: ${issue.message}`)
    .join('; ')
  throw new AppError('Env Error', errorMessages)
}
export const ENV = validation.data
