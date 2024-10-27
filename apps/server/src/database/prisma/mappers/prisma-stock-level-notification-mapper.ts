import { StockLevelNotification } from '@stocker/core/entities'
import type { PrismaStockLevelNotification } from '../types'

export class PrismaStockLevelNotificationMapper {
  toDomain(stockLevelNotification: PrismaStockLevelNotification): StockLevelNotification {
    return StockLevelNotification.create({
      companyId: stockLevelNotification.company_id,
      product: {
        id: stockLevelNotification.product_id,
        name: stockLevelNotification.Product.name,
        code: stockLevelNotification.Product.code,
      },
      createdAt: stockLevelNotification.created_at,
    })
  }

  toPrisma(stockLevelNotification: StockLevelNotification): PrismaStockLevelNotification {
    return {
      id: stockLevelNotification.id,
      company_id: stockLevelNotification.companyId,
      product_id: stockLevelNotification.product.id,
      created_at: stockLevelNotification.createdAt,
      Product: {
        id: stockLevelNotification.product.id,
        name: stockLevelNotification.product.name,
        code: stockLevelNotification.product.code,
      },
    }
  }
}
