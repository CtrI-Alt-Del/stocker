import type { Product } from '@prisma/client'
import type { PrismaBatch } from './prisma-batch'

export type PrismaProduct = Product & { batches: PrismaBatch[] }
