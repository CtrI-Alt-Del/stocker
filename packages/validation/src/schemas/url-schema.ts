import { stringSchema } from './string-schema'

export const urlSchema = stringSchema.url({ message: 'url inválida' })
