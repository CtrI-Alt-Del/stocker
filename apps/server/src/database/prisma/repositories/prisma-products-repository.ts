import type { Product } from '@stocker/core/entities'
import type { IProductsRepository } from '@stocker/core/interfaces'
import { PAGINATION } from '@stocker/core/constants'

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
          batches: true,
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
          batches: true,
        },
      })

      return prismaProducts.map((prismaProduct) => this.mapper.toDomain(prismaProduct))
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
