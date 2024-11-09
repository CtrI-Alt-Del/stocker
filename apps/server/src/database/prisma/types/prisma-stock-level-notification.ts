import type { StockLevelNotification } from '@prisma/client'

export type PrismaStockLevelNotification = StockLevelNotification & {
  Product: {
    id: string
    name: string
    code: string
    company_id: string
  }
}
