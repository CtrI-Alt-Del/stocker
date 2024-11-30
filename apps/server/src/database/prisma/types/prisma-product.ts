import type { Product } from '@prisma/client'
import type { PrismaBatch } from './prisma-batch'
import type { PrismaCategory } from './prisma-category'
import type { PrismaSupplier } from './prisma-suppliers'
import type { PrismaLocation } from './prisma-location'

export type PrismaProduct = Product & {
  batches: PrismaBatch[]
  category?: PrismaCategory | null
  location?: PrismaLocation | null
  supplier?: PrismaSupplier | null
}
