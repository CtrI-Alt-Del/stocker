import type { StockLevelNotification } from '@prisma/client'
import type { PrismaProduct } from './prisma-product'

export type PrismaStockLevelNotification = StockLevelNotification & {
  product: PrismaProduct
}
