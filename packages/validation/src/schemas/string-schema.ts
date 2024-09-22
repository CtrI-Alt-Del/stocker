import { z } from 'zod'

export const stringSchema = z.string().min(1, 'texto inválido')
