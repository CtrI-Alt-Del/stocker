import z from 'zod'

export const descriptionSchema = z.union([
  z.string().min(3, 'pelo menos 3 caracteres'),
  z.string().max(500, 'no máximo 500 caracteres'),
])
