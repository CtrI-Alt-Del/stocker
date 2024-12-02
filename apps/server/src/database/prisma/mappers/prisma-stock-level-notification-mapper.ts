import { StockLevelNotification } from '@stocker/core/entities'
import type { PrismaStockLevelNotification } from '../types'
import { PrismaProductMapper } from './prisma-product-mapper'

export class PrismaStockLevelNotificationMapper {
  private readonly productMapper = new PrismaProductMapper()
  toDomain(stockLevelNotification: PrismaStockLevelNotification): StockLevelNotification {
    const productMapper = new PrismaProductMapper()
    return StockLevelNotification.create({
      id: stockLevelNotification.id,
      productDto: productMapper.toDomain(stockLevelNotification.product).dto,
      companyId: stockLevelNotification.product.company_id,
      sentAt: stockLevelNotification.registered_at,
    })
  }

  toPrisma(stockLevelNotification: StockLevelNotification): PrismaStockLevelNotification {
    const productMapper = new PrismaProductMapper()
    return {
      id: stockLevelNotification.id,
      company_id: stockLevelNotification.companyId,
      product_id: stockLevelNotification.product.id,
      registered_at: stockLevelNotification.sentAt,
      product: productMapper.toPrisma(stockLevelNotification.product),
    }
  }
}
