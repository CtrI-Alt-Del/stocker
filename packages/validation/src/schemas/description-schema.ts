import { stringSchema } from './string-schema'

export const descriptionSchema = stringSchema
  .min(3, 'pelo menos 3 caracteres')
  .max(500, 'no máximo 500 caracteres')
