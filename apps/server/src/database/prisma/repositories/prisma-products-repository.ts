import type { Product } from '@stocker/core/entities'
import type { IProductsRepository } from '@stocker/core/interfaces'
import { PAGINATION } from '@stocker/core/constants'
import { Datetime } from '@stocker/core/libs'
import type { ProducsStocksListParams, ProductsListParams } from '@stocker/core/types'

import type { PrismaProduct } from '../types'
import { prisma } from '../prisma-client'
import { PrismaProductMapper } from '../mappers'
import { PrismaError } from '../prisma-error'

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

  async findOrderByInventoryMovementsCount({
    startDate,
    endDate,
  }: { startDate: Date; endDate: Date }): Promise<Product[]> {
    const formattedStartDate = new Datetime(startDate).format('YYYY-MM-DD')
    const formattedEndDate = new Datetime(endDate).format('YYYY-MM-DD')

    try {
      const prismaProducts = (await prisma.$queryRaw`
        SELECT 
        P.*, 
        COUNT(DISTINCT CASE WHEN IM.movement_type = 'INBOUND' THEN IM.id ELSE NULL END) inbound_movements_count,
        COUNT(DISTINCT CASE WHEN IM.movement_type = 'OUTBOUND' THEN IM.id ELSE NULL END) outbound_movements_count,
        ARRAY_AGG(JSON_BUILD_OBJECT(
          'id', B.id,
          'code', B.code,
          'expiration_date', B.expiration_date,
          'items_count', B.items_count,
          'product_id', B.product_id,
          'registered_at', B.registered_at
        )) batches
      FROM products P
      LEFT JOIN inventory_movements IM ON P.id = IM.product_id
      LEFT JOIN batches B ON B.product_id = P.id
      WHERE DATE(IM.registered_at) BETWEEN DATE(${formattedEndDate}) AND DATE(${formattedStartDate})
      GROUP BY P.id
      ORDER BY 
        COUNT(DISTINCT CASE WHEN IM.movement_type = 'INBOUND' THEN IM.id ELSE NULL END) + 
        COUNT(DISTINCT CASE WHEN IM.movement_type = 'OUTBOUND' THEN IM.id ELSE NULL END) 
      DESC
      `) as PrismaProduct &
        {
          inbound_movements_count: number
          outbound_movements_count: number
        }[]

      const products = []

      for (const prismaProduct of prismaProducts) {
        const product = this.mapper.toDomain(prismaProduct as unknown as PrismaProduct)
        product.inboundInventoryMovementsCount = prismaProduct.inbound_movements_count
        product.outboundInventoryMovementsCount = prismaProduct.outbound_movements_count
        products.push(product)
      }
      return products
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async countSafeStockLevel(): Promise<number> {
    const result = (await prisma.$queryRaw`
      SELECT COUNT(safe_level_stock_product) count
      FROM
        (
          SELECT P.id FROM products P
          JOIN batches B ON B.product_id = P.id
          GROUP BY P.id
          HAVING SUM(B.items_count) > P.minimum_stock
        ) safe_level_stock_product
    `) as { count: number }[]
    return Number(result[0]?.count)
  }

  async countAverageStockLevel(): Promise<number> {
    const result = (await prisma.$queryRaw`
      SELECT COUNT(average_level_stock_products)
      FROM
        (
          SELECT P.id FROM products P
          JOIN batches B ON B.product_id = P.id
          GROUP BY P.id
          HAVING SUM(B.items_count) > 0 AND SUM(B.items_count) < P.minimum_stock
        ) average_level_stock_products
    `) as { count: number }[]
    return Number(result[0]?.count)
  }

  async countDangerStockLevel(): Promise<number> {
    const result = (await prisma.$queryRaw`
      SELECT COUNT(danger_level_stock_products)
      FROM
        (
          SELECT P.id FROM products P
          LEFT JOIN batches B ON B.product_id = P.id
          GROUP BY P.id
          HAVING COALESCE(SUM(items_count), 0) = 0
        ) danger_level_stock_products
  `) as { count: number }[]
    return Number(result[0]?.count)
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
}
