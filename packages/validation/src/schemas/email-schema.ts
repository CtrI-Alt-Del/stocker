import z from 'zod'
import { stringSchema } from './string-schema'

export const emailSchema = stringSchema.email({ message: 'E-mail inválido' })
