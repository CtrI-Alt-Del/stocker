import z from 'zod'

export const fileSchema = z.instanceof(File, { message: 'arquivo inválido' })
