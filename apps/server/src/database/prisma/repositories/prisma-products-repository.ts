import type { Product } from '@stocker/core/entities'
import type { IProductsRepository } from '@stocker/core/interfaces'
import { PAGINATION } from '@stocker/core/constants'

import { prisma } from '../prisma-client'
import { PrismaProductMapper } from '../mappers'
import { PrismaError } from '../prisma-error'
import type { ProducsStocksListParams } from '@stocker/core/types'

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

  async findMany(page: number): Promise<Product[]> {
    try {
      const prismaProducts = await prisma.product.findMany({
        take: PAGINATION.itemsPerPage,
        skip: (page - 1) * PAGINATION.itemsPerPage,
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
    inventoryMovementsCount: { inbound: number; outbound: number }
  }> {
    try {
      const offset = (params.page - 1) * PAGINATION.itemsPerPage
      const limit = PAGINATION.itemsPerPage

      const prismaProducts: any = await prisma.$queryRaw`
        SELECT p.*, 
               (SELECT COUNT(*) FROM inventory_movements im WHERE im.product_id = p.id AND im.movement_type = 'INBOUND') as inboundCount,
               (SELECT COUNT(*) FROM inventory_movements im WHERE im.product_id = p.id AND im.movement_type = 'OUTBOUND') as outboundCount
        FROM products p
        ORDER BY p.id
        LIMIT ${limit} OFFSET ${offset}
      `

      const productIds = prismaProducts.map((product: any) => product.id)

      // Query to fetch batches for each product
      const prismaBatches: any = await prisma.$queryRaw`
        SELECT b.* 
        FROM batches b
        WHERE b.product_id IN (${productIds})
        ORDER BY b.product_id, b.registered_at ASC
      `

      // Group batches by product ID
      const batchesByProductId: Record<string, any[]> = prismaBatches.reduce(
        (acc: any, batch: any) => {
          if (!acc[batch.product_id]) acc[batch.product_id] = []
          acc[batch.product_id].push(batch)
          return acc
        },
        {},
      )

      const products = prismaProducts.map((prismaProduct: any) => {
        const product = this.mapper.toDomain(prismaProduct)
        product.batches = batchesByProductId[prismaProduct.id] || []
        return product
      })

      const count: any = await prisma.$queryRaw`SELECT COUNT(*) FROM products`

      const inventoryMovementsCount = {
        inbound: prismaProducts.reduce(
          (acc: number, product: any) => acc + Number(product.inboundCount),
          0,
        ),
        outbound: prismaProducts.reduce(
          (acc: number, product: any) => acc + Number(product.outboundCount),
          0,
        ),
      }

      return { products, count: Number(count[0]?.count || 0), inventoryMovementsCount }
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
