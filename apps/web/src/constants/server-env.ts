import { z } from 'zod'

import { EnvError } from '@stocker/core/errors'
import { emailSchema, stringSchema } from '@stocker/validation/schemas'

const envSchema = z.object({
  passwordResetSecret: stringSchema,
})

const validation = envSchema.safeParse({
  passwordResetSecret: process.env.PASSWORD_RESET_SECRET,
})

if (!validation.success) {
  throw new EnvError(validation.error.flatten().fieldErrors)
}

export const SERVER_ENV = validation.data
