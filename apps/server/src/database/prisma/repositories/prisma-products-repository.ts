import type { Sql } from '@prisma/client/runtime/library'
import { Prisma } from '@prisma/client'

import type { Product } from '@stocker/core/entities'
import type { IProductsRepository } from '@stocker/core/interfaces'
import { PAGINATION } from '@stocker/core/constants'
import { Datetime } from '@stocker/core/libs'
import type {
  MostTrendingProductsListParams,
  ProducsStocksListParams,
  ProductsListParams,
} from '@stocker/core/types'

import { prisma } from '../prisma-client'
import { PrismaError } from '../prisma-error'
import type { PrismaProduct } from '../types'
import { PrismaProductMapper } from '../mappers'

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
          location_id: prismaProduct.location_id,
          company_id: prismaProduct.company_id,
          category_id: prismaProduct.category_id,
          supplier_id: prismaProduct.supplier_id,
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

  async addMany(products: Product[]): Promise<void> {
    try {
      const prismaProducts = products.map(this.mapper.toPrisma)

      await prisma.product.createMany({
        data: prismaProducts.map((prismaProduct) => ({
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
          supplier_id: prismaProduct.supplier_id,
          selling_price: prismaProduct.selling_price,
          uom: prismaProduct.uom,
          code: prismaProduct.code,
          minimum_stock: prismaProduct.minimum_stock,
          brand: prismaProduct.brand,
          is_active: prismaProduct.is_active,
          model: prismaProduct.model,
        })),
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
          category: true,
          supplier: true,
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

  async findMany({
    page,
    companyId,
    categoryId,
    locationId,
    name,
    supplierId,
  }: ProductsListParams) {
    try {
      const prismaProducts = await prisma.product.findMany({
        take: PAGINATION.itemsPerPage,
        skip: page > 0 ? (page - 1) * PAGINATION.itemsPerPage : 1,
        where: {
          company_id: companyId,
          ...(name && { name: { contains: name, mode: 'insensitive' } }),
          ...(categoryId && {
            OR: [
              { category_id: categoryId },
              { category: { parent_category_id: categoryId } },
            ],
          }),
          ...(locationId && {
            OR: [
              { location_id: locationId },
              { location: { parent_location_id: locationId } },
            ],
          }),
          ...(supplierId && { supplier_id: supplierId }),
        },
        orderBy: { registered_at: 'desc' },
        include: {
          category: true,
          supplier: true,
          location: true,
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

      const count = await prisma.product.count({
        where: {
          company_id: companyId,
          ...(name && { name: { contains: name, mode: 'insensitive' } }),
          ...(categoryId && { category_id: categoryId }),
          ...(locationId && { location_id: locationId }),
          ...(supplierId && { supplier_id: supplierId }),
        },
      })
      const products = prismaProducts.map(this.mapper.toDomain)

      return {
        products,
        count,
      }
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async findAllByCompany(companyId: string): Promise<Product[]> {
    try {
      const prismaProducts = await prisma.product.findMany({
        where: {
          company_id: companyId,
        },
        include: {
          category: true,
          supplier: true,
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

      return prismaProducts.map(this.mapper.toDomain)
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async findManyInventoryMovementsCount({
    page,
    companyId,
    categoryId,
    locationId,
    productName,
    supplierId,
    stockLevel,
  }: ProducsStocksListParams) {
    try {
      const prismaProducts = await prisma.product.findMany({
        ...(page && {
          take: PAGINATION.itemsPerPage,
          skip: page > 0 ? (page - 1) * PAGINATION.itemsPerPage : 1,
        }),
        where: {
          company_id: companyId,
          ...(productName && { name: { contains: productName, mode: 'insensitive' } }),
          ...(categoryId && { category_id: categoryId }),
          ...(locationId && { location_id: locationId }),
          ...(supplierId && { supplier_id: supplierId }),
          ...(stockLevel && { stockLevel: stockLevel }),
        },
        orderBy: { registered_at: 'desc' },
        include: {
          category: true,
          supplier: true,
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

      const count = await prisma.product.count({
        where: {
          company_id: companyId,
          ...(productName && { name: { contains: productName, mode: 'insensitive' } }),
          ...(categoryId && { category_id: categoryId }),
          ...(locationId && { location_id: locationId }),
          ...(supplierId && { supplier_id: supplierId }),
          ...(stockLevel && { stockLevel: stockLevel }),
        },
      })

      const products = prismaProducts.map(this.mapper.toDomain)

      return {
        products,
        count,
      }
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async findManyWithInventoryMovementsCount({
    page,
    companyId,
    productName,
    categoryId,
    locationId,
    supplierId,
    stockLevel,
  }: ProducsStocksListParams): Promise<{
    products: Product[]
    count: number
  }> {
    try {
      let paginationSql: Sql = Prisma.sql``

      if (page) {
        const offset = (page - 1) * PAGINATION.itemsPerPage
        const limit = PAGINATION.itemsPerPage
        paginationSql = Prisma.sql`LIMIT ${limit} OFFSET ${offset}`
      }

      let whereSql = Prisma.sql`P.is_active = true AND P.company_id = ${companyId}`

      if (productName) {
        whereSql = Prisma.sql`${whereSql} AND P.name ILIKE ${`%${productName}%`}`
      }

      if (categoryId) {
        whereSql = Prisma.sql`${whereSql} AND (P.category_id = ${categoryId} OR C.parent_category_id = ${categoryId})`
      }

      if (supplierId) {
        whereSql = Prisma.sql`${whereSql} AND P.supplier_id = ${supplierId}`
      }

      if (locationId) {
        whereSql = Prisma.sql`${whereSql} AND (P.location_id = ${locationId} OR L.parent_location_id =  ${locationId})`
      }

      let havingSql = Prisma.sql``

      if (stockLevel === 'danger') {
        havingSql = Prisma.sql`HAVING COALESCE(SUM(B.items_count), 0) = 0`
      } else if (stockLevel === 'safe') {
        havingSql = Prisma.sql`HAVING COALESCE(SUM(B.items_count), 0) > P.minimum_stock`
      } else if (stockLevel === 'average') {
        havingSql = Prisma.sql`HAVING COALESCE(SUM(B.items_count), 0) < P.minimum_stock AND COALESCE(SUM(B.items_count),0) != 0`
      } else {
        havingSql = Prisma.sql``
      }

      const prismaProductsSql = Prisma.sql`
      SELECT
        P.*,
        ARRAY_AGG(
          JSON_BUILD_OBJECT(
            'id', B.id,
            'code', B.code,
            'expiration_date', B.expiration_date,
            'items_count', B.items_count,
            'product_id', B.product_id,
            'registered_at', B.registered_at
          )
        ) batches,
        COUNT(DISTINCT CASE WHEN IM.movement_type = 'INBOUND' THEN IM.id ELSE NULL END) inbound_inventory_movements_count,
        COUNT(DISTINCT CASE WHEN IM.movement_type = 'OUTBOUND' THEN IM.id ELSE NULL END) outbound_inventory_movements_count
      FROM products P
      LEFT JOIN inventory_movements IM ON IM.product_id = P.id
      LEFT JOIN batches B ON B.product_id = P.id
      LEFT JOIN categories C ON C.id = P.category_id
      LEFT JOIN locations L ON L.id = P.location_id
      WHERE ${whereSql}
      GROUP BY P.id
      ${havingSql}
      ORDER BY P.registered_at DESC
    `

      const prismaProducts = (await prisma.$queryRaw`
      ${prismaProductsSql}
      ${paginationSql}
    `) as PrismaProduct &
        {
          inbound_inventory_movements_count: number
          outbound_inventory_movements_count: number
        }[]

      const prismaProductsCount = (await prisma.$queryRaw`
      SELECT COUNT(products_stocks) FROM (${prismaProductsSql}) products_stocks
    `) as {
        count: number
      }[]

      const products = prismaProducts.map((prismaProduct) => {
        const product = this.mapper.toDomain(prismaProduct as unknown as PrismaProduct)
        product.inboundInventoryMovementsCount = Number(
          prismaProduct.inbound_inventory_movements_count,
        )
        product.outboundInventoryMovementsCount = Number(
          prismaProduct.outbound_inventory_movements_count,
        )
        return product
      })

      return {
        products,
        count: prismaProductsCount[0]?.count ? Number(prismaProductsCount[0]?.count) : 0,
      }
    } catch (error) {
      throw new PrismaError(error)
    }
  }
  async findOrderByInventoryMovementsCount({
    startDate,
    endDate,
    page,
    categoryId,
    companyId,
  }: MostTrendingProductsListParams) {
    const formattedStartDate = new Datetime(startDate).format('YYYY-MM-DD')
    const formattedEndDate = new Datetime(endDate).format('YYYY-MM-DD')

    let paginationSql: Sql = Prisma.sql``
    let categorySql: Sql = Prisma.sql``

    if (page) {
      const itemsPerPage = 5
      const offset = (page - 1) * itemsPerPage
      paginationSql = Prisma.sql`LIMIT ${itemsPerPage} OFFSET ${offset}`
    }

    if (categoryId) {
      categorySql = Prisma.sql`P.category_id = ${categoryId} AND`
    }

    const productsSql = Prisma.sql`
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
        WHERE 
          P.is_active = true AND
          ${categorySql}
          DATE(IM.registered_at) BETWEEN DATE(${formattedStartDate}) AND DATE(${formattedEndDate}) AND P.company_id = ${companyId}
        GROUP BY P.id
        HAVING COUNT(DISTINCT CASE WHEN IM.movement_type = 'OUTBOUND' THEN IM.id ELSE NULL END) > 0
        ORDER BY 
          COUNT(DISTINCT CASE WHEN IM.movement_type = 'OUTBOUND' THEN IM.id ELSE NULL END) 
        DESC
    `

    try {
      const prismaProducts = (await prisma.$queryRaw`
        ${productsSql}
        ${paginationSql}
      `) as PrismaProduct &
        {
          inbound_movements_count: number
          outbound_movements_count: number
        }[]
      const prismaProductsCount = (await prisma.$queryRaw`
         SELECT COUNT(most_trending_products) FROM (${productsSql}) most_trending_products
        `) as {
        count: number
      }[]

      const products = []

      for (const prismaProduct of prismaProducts) {
        const product = this.mapper.toDomain(prismaProduct as unknown as PrismaProduct)
        product.inboundInventoryMovementsCount = Number(
          prismaProduct.inbound_movements_count,
        )
        product.outboundInventoryMovementsCount = Number(
          prismaProduct.outbound_movements_count,
        )
        products.push(product)
      }

      return { products, count: Number(prismaProductsCount[0]?.count) ?? 0 }
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async countSafeStockLevel(companyId: string): Promise<number> {
    const result = (await prisma.$queryRaw`
      SELECT COUNT(safe_level_stock_product) count
      FROM
        (
          SELECT P.id FROM products P
          JOIN batches B ON B.product_id = P.id
          WHERE P.is_active = true AND P.company_id = ${companyId}
          GROUP BY P.id 
          HAVING SUM(B.items_count) > P.minimum_stock
        ) safe_level_stock_product
    `) as { count: number }[]
    return Number(result[0]?.count)
  }

  async countAverageStockLevel(companyId: string): Promise<number> {
    const result = (await prisma.$queryRaw`
      SELECT COUNT(average_level_stock_products)
      FROM
        (
          SELECT P.id FROM products P
          JOIN batches B ON B.product_id = P.id
          WHERE P.is_active = true AND P.company_id = ${companyId}
          GROUP BY P.id
          HAVING SUM(B.items_count) > 0 AND SUM(B.items_count) < P.minimum_stock
        ) average_level_stock_products
    `) as { count: number }[]
    return Number(result[0]?.count)
  }

  async countDangerStockLevel(companyId: string): Promise<number> {
    const result = (await prisma.$queryRaw`
      SELECT COUNT(danger_level_stock_products)
      FROM
        (
          SELECT P.id FROM products P
          LEFT JOIN batches B ON B.product_id = P.id
          WHERE P.is_active = true AND P.company_id = ${companyId}
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
          supplier_id: prismaProduct.supplier_id,
          location_id: prismaProduct.location_id,
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

  async calculateInventoryValue(companyId: string): Promise<number> {
    try {
      const result = await prisma.product.aggregate({
        _sum: {
          cost_price: true,
        },
        where: {
          company_id: companyId,
          is_active: true,
        },
      })

      const totalInventoryValue = result._sum.cost_price ?? 0

      return totalInventoryValue
    } catch (error) {
      throw new PrismaError(error)
    }
  }
}
