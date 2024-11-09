import { StockLevelNotification } from '@stocker/core/entities'
import type { PrismaStockLevelNotification } from '../types'

export class PrismaStockLevelNotificationMapper {
  toDomain(stockLevelNotification: PrismaStockLevelNotification): StockLevelNotification {
    return StockLevelNotification.create({
      id: stockLevelNotification.id,
      product: {
        id: stockLevelNotification.product_id,
        name: stockLevelNotification.Product.name,
        code: stockLevelNotification.Product.code,
      },
      companyId: stockLevelNotification.Product.company_id,
      sentAt: stockLevelNotification.registered_at,
    })
  }

  toPrisma(stockLevelNotification: StockLevelNotification): PrismaStockLevelNotification {
    return {
      id: stockLevelNotification.id,
      company_id: stockLevelNotification.companyId,
      product_id: stockLevelNotification.product.id,
      registered_at: stockLevelNotification.sentAt,
      Product: {
        id: stockLevelNotification.product.id,
        name: stockLevelNotification.product.name,
        code: stockLevelNotification.product.code,
        company_id: stockLevelNotification.companyId,
      },
    }
  }
}
