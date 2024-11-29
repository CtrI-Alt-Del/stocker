import type { Product } from '@prisma/client'
import type { PrismaBatch } from './prisma-batch'
import type { PrismaCategory } from './prisma-categories'
import type { PrismaSupplier } from './prisma-suppliers'
import type { PrismaLocation } from './prisma-locations'

export type PrismaProduct = Product & {
  batches: PrismaBatch[]
  category?: PrismaCategory | null
  location?: PrismaLocation | null
  supplier?: PrismaSupplier | null
}
