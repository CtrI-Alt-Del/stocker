import z from 'zod'

export const descriptionSchema = z
  .string()
  .min(3, 'pelo menos 3 caracteres')
  .max(500, 'no máximo 500 caracteres')
