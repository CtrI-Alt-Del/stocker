import { z } from 'zod'

export const appModeSchema = z.enum(['dev', 'prod']).default('dev')
