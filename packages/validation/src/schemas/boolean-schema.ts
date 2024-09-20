import z from 'zod'

export const booleanSchema = z.coerce.boolean({ message: 'apenas verdadeiro ou falso' })
