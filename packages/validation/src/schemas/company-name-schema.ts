import { stringSchema } from './string-schema'

export const companyNameSchema = stringSchema
  .min(3, 'pelo menos 3 caracteres')
  .max(50, 'no máximo 50 caracteres')
