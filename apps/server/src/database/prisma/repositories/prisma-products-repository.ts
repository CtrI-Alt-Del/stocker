import type { Product } from '@stocker/core/entities'
import type { IProductsRepository } from '@stocker/core/interfaces'
import { PAGINATION } from '@stocker/core/constants'

import { prisma } from '../prisma-client'
import { PrismaBatchesMapper, PrismaProductMapper } from '../mappers'
import { PrismaError } from '../prisma-error'
import type { ProducsStocksListParams, ProductsListParams } from '@stocker/core/types'

export class PrismaProductsRepository implements IProductsRepository {
  private readonly mapper: PrismaProductMapper = new PrismaProductMapper()

  async add(product: Product): Promise<void> {
    try {
      const prismaProduct = this.mapper.toPrisma(product)

      await prisma.product.create({
        data: {
          id: prismaProduct.id,
          name: prismaProduct.name,
          image: prismaProduct.image,
          cost_price: prismaProduct.cost_price,
          description: prismaProduct.description,
          width: prismaProduct.width,
          length: prismaProduct.length,
          height: prismaProduct.height,
          weight: prismaProduct.weight,
          company_id: prismaProduct.company_id,
          category_id: prismaProduct.category_id,
          selling_price: prismaProduct.selling_price,
          uom: prismaProduct.uom,
          code: prismaProduct.code,
          minimum_stock: prismaProduct.minimum_stock,
          brand: prismaProduct.brand,
          is_active: prismaProduct.is_active,
          model: prismaProduct.model,
        },
      })
    } catch (error) {
      throw new PrismaError(error)
    }
  }
  async findById(productId: string): Promise<Product | null> {
    try {
      const prismaProduct = await prisma.product.findUnique({
        where: {
          id: productId,
        },
        include: {
          batches: {
            orderBy: [
              {
                expiration_date: 'asc',
              },
              {
                registered_at: 'asc',
              },
            ],
          },
        },
      })

      if (!prismaProduct) return null

      return this.mapper.toDomain(prismaProduct)
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async findMany({ page }: ProductsListParams): Promise<Product[]> {
    try {
      const prismaProducts = await prisma.product.findMany({
        take: PAGINATION.itemsPerPage,
        skip: page > 0 ? (page - 1) * PAGINATION.itemsPerPage : 1,
        include: {
          batches: {
            orderBy: [
              {
                expiration_date: 'asc',
              },
              {
                registered_at: 'asc',
              },
            ],
          },
        },
      })

      return prismaProducts.map((prismaProduct) => this.mapper.toDomain(prismaProduct))
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async countSafeStockLevel(): Promise<number> {
    const result = await prisma.$queryRaw`
      SELECT COUNT(*) count, SUM(B.items_count) stock FROM products P
      JOIN batches B JOIN B.product_id = P.id
      GROUP BY P.id
      HAVING stock > P.minimum_stock
    `
    console.log(result)
    return 0
  }

  async countAverageStockLevel(): Promise<number> {
    const result = await prisma.$queryRaw`
      SELECT COUNT(*) count, SUM(B.items_count) stock FROM products P
      JOIN batches B JOIN B.product_id = P.id
      GROUP BY P.id
      HAVING stock > 0 AND stock <= P.minimum_stock
    `
    console.log(result)
    return 0
  }

  async countDangerStockLevel(): Promise<number> {
    const result = await prisma.$queryRaw`
    SELECT COUNT(*) count, SUM(B.items_count) stock FROM products P
    JOIN batches B JOIN B.product_id = P.id
    GROUP BY P.id
    HAVING stock == 0
  `
    console.log(result)
    return 0
  }

  async findManyWithInventoryMovements(params: ProducsStocksListParams): Promise<{
    products: Product[]
    count: number
  }> {
    try {
      const offset = (params.page - 1) * PAGINATION.itemsPerPage
      const limit = PAGINATION.itemsPerPage

      const prismaProducts: any = await prisma.$queryRaw`
        SELECT p.*,
              ARRAY_AGG(
               JSON_BUILD_OBJECT(
                  'id', b.id,
                  'code', b.code,
                  'expiration_date', b.expiration_date,
                  'items_count', b.items_count,
                  'product_id', b.product_id,
                  'registered_at', b.registered_at,
                )
              ) AS batchItemsJson
        'inboundCount', COUNT(DISTINCT CASE WHEN im.movement_type = 'INBOUND' THEN im.id ELSE NULL END),
        'outboundCount', COUNT(DISTINCT CASE WHEN im.movement_type = 'OUTBOUND' THEN im.id ELSE NULL END),
        FROM products p
        LEFT JOIN inventory_movements im ON p.id = im.product_id
        GROUP BY p.id
        ORDER BY p.id
        LIMIT ${limit} OFFSET ${offset}
      `

      const products = prismaProducts.map((prismaProduct: any) => {
        const product = this.mapper.toDomain(prismaProduct)
        product.inboundInventoryMovementsCount = prismaProduct[prismaProduct.id]
        product.outboundInventoryMovementsCount = prismaProduct[prismaProduct.id]
        return product
      })
      const count: any = await prisma.$queryRaw`SELECT COUNT(*) FROM products`
      return { products, count: Number(count[0]?.count || 0) }
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async count(): Promise<number> {
    try {
      return await prisma.product.count()
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async update(product: Product): Promise<void> {
    try {
      const prismaProduct = this.mapper.toPrisma(product)

      await prisma.product.update({
        data: {
          name: prismaProduct.name,
          image: prismaProduct.image,
          cost_price: prismaProduct.cost_price,
          description: prismaProduct.description,
          width: prismaProduct.width,
          length: prismaProduct.length,
          height: prismaProduct.height,
          weight: prismaProduct.weight,
          company_id: prismaProduct.company_id,
          category_id: prismaProduct.category_id,
          selling_price: prismaProduct.selling_price,
          uom: prismaProduct.uom,
          code: prismaProduct.code,
          minimum_stock: prismaProduct.minimum_stock,
          brand: prismaProduct.brand,
          is_active: prismaProduct.is_active,
          model: prismaProduct.model,
        },
        where: {
          id: product.id,
        },
      })
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async deleteMany(productsIds: string[]): Promise<void> {
    try {
      await prisma.product.deleteMany({
        where: {
          id: {
            in: productsIds,
          },
        },
      })
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async findOrderByInventoryMovementsCount({ startDate, endDate }: { startDate: Date; endDate: Date }): Promise<Product[]> {
    try {
      const prismaProducts: any = await prisma.$queryRaw`
        SELECT p.*, 
               COUNT(DISTINCT CASE WHEN im.movement_type = 'INBOUND' THEN im.id ELSE NULL END) AS inboundCount,
               COUNT(DISTINCT CASE WHEN im.movement_type = 'OUTBOUND' THEN im.id ELSE NULL END) AS outboundCount
        FROM products p
        LEFT JOIN inventory_movements im ON p.id = im.product_id
        WHERE im.registered_at BETWEEN ${startDate} AND ${endDate}
        GROUP BY p.id
        ORDER BY inboundCount + outboundCount DESC
      `;

      return prismaProducts.map((prismaProduct: any) => {
        const product = this.mapper.toDomain(prismaProduct);
        product.inboundInventoryMovementsCount = prismaProduct.inboundCount;
        product.outboundInventoryMovementsCount = prismaProduct.outboundCount;
        return product;
      });
    } catch (error) {
      throw new PrismaError(error);
    }
  }
}
