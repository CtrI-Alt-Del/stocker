import { stringSchema } from './string-schema'

export const idSchema = stringSchema.uuid({ message: 'indentificador inválido' })
