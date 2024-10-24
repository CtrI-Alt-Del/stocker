import { stringSchema } from './string-schema'

export const passwordSchema = stringSchema.min(8, 'Pelo menos 8 caracteres')
