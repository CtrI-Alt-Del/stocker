import type { InventoryMovement } from '@stocker/core/entities'
import type { IInventoryMovementsRepository } from '@stocker/core/interfaces'
import type {
  InventoryMovementsListParams,
  FindByDateRangeParams,
} from '@stocker/core/types'

import { Datetime } from '@stocker/core/libs'
import { PAGINATION } from '@stocker/core/constants'

import { prisma } from '../prisma-client'
import { PrismaInventoryMovementsMapper } from '../mappers'
import { PrismaError } from '../prisma-error'

export class PrismaInventoryMovementsRepository implements IInventoryMovementsRepository {
  private readonly mapper: PrismaInventoryMovementsMapper =
    new PrismaInventoryMovementsMapper()

  async add(inventoryMovement: InventoryMovement): Promise<void> {
    try {
      const prismaInventoryMovement = this.mapper.toPrisma(inventoryMovement)

      await prisma.inventoryMovement.create({
        data: {
          id: prismaInventoryMovement.id,
          items_count: prismaInventoryMovement.items_count,
          registered_at: prismaInventoryMovement.registered_at,
          movement_type: prismaInventoryMovement.movement_type,
          product_id: prismaInventoryMovement.product_id,
          user_id: prismaInventoryMovement.user_id,
          remark: prismaInventoryMovement.remark,
        },
      })
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async addMany(inventoryMovements: InventoryMovement[]): Promise<void> {
    try {
      const prismaInventoryMovements = inventoryMovements.map(this.mapper.toPrisma)

      await prisma.inventoryMovement.createMany({
        data: prismaInventoryMovements.map((prismaInventoryMovement) => ({
          id: prismaInventoryMovement.id,
          items_count: prismaInventoryMovement.items_count,
          registered_at: prismaInventoryMovement.registered_at,
          movement_type: prismaInventoryMovement.movement_type,
          product_id: prismaInventoryMovement.product_id,
          user_id: prismaInventoryMovement.user_id,
          remark: prismaInventoryMovement.remark,
        })),
      })
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async findAllByCompany(companyId: string): Promise<InventoryMovement[]> {
    const prismaInventoryMovements = await prisma.inventoryMovement.findMany({
      where: {
        Product: {
          company_id: companyId,
        },
      },
      orderBy: {
        registered_at: 'desc',
      },
      include: {
        User: true,
        Product: {
          include: {
            batches: true,
          },
        },
      },
    })

    return prismaInventoryMovements.map(this.mapper.toDomain)
  }

  async findMany({
    page,
    startDate,
    endDate,
    movementType,
    productId,
    companyId,
    employeeId,
  }: InventoryMovementsListParams) {
    try {
      const whereCondition = productId ? { product_id: productId } : undefined
      const count = await prisma.inventoryMovement.count({ where: whereCondition })

      let paginationParams = {}

      if (page) {
        paginationParams = {
          take: PAGINATION.itemsPerPage,
          skip: (page - 1) * PAGINATION.itemsPerPage,
        }
      }

      let dateRangeParams = {}

      if (startDate && endDate) {
        dateRangeParams = {
          registered_at: {
            gte: startDate,
            lte: endDate,
          },
        }
      }

      let movementTypeFilter = {}
      if (movementType) {
        movementTypeFilter = {
          movement_type: movementType === 'inbound' ? 'INBOUND' : 'OUTBOUND',
        }
      }

      let productIdFilter = {}
      if (productId) {
        productIdFilter = { product_id: productId }
      }

      let employeeIdFilter = {}
      if (employeeId) {
        employeeIdFilter = { user_id: employeeId }
      }

      const prismaInventoryMovements = await prisma.inventoryMovement.findMany({
        ...paginationParams,
        where: {
          ...productIdFilter,
          ...movementTypeFilter,
          ...dateRangeParams,
          ...employeeIdFilter,
          Product: {
            company_id: companyId,
          },
        },
        orderBy: {
          registered_at: 'desc',
        },
        include: {
          User: true,
          Product: {
            include: {
              batches: true,
            },
          },
        },
      })

      const inventoryMovements = prismaInventoryMovements.map(this.mapper.toDomain)

      return {
        inventoryMovements,
        count: page ? count : inventoryMovements.length,
      }
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async findAllByDateRange(
    startDate: Date,
    endDate: Date,
    productId?: string,
  ): Promise<InventoryMovement[]> {
    const prismaInventoryMovements = await prisma.inventoryMovement.findMany({
      where: {
        registered_at: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        User: true,
        Product: {
          include: {
            batches: true,
          },
        },
      },
    })

    return prismaInventoryMovements.map(this.mapper.toDomain)
  }

  async count(companyId: string): Promise<number> {
    try {
      return await prisma.inventoryMovement.count({
        where: { Product: { company_id: companyId } },
      })
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async countItems(): Promise<number> {
    try {
      const result = await prisma.batch.groupBy({
        by: ['id'],
        _sum: {
          items_count: true,
        },
      })
      return Number(result[0]?._sum)
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async countInbound(companyId: string): Promise<number> {
    try {
      return await prisma.inventoryMovement.count({
        where: { movement_type: 'INBOUND', Product: { company_id: companyId } },
      })
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async countOutbound(companyId: string): Promise<number> {
    try {
      return await prisma.inventoryMovement.count({
        where: {
          movement_type: 'OUTBOUND',
          Product: {
            company_id: companyId,
          },
        },
      })
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async findByDateRange({
    startDate,
    endDate,
    productId,
  }: FindByDateRangeParams): Promise<InventoryMovement[]> {
    try {
      const start = startDate || new Datetime(new Date()).subtractYears(1)
      const end = endDate || new Date()

      const prismaInventoryMovements = await prisma.inventoryMovement.findMany({
        where: {
          registered_at: {
            gte: start,
            lte: end,
          },
          product_id: productId || undefined,
        },
      })

      const inventoryMovements = prismaInventoryMovements.map((inventoryMovement) => {
        return this.mapper.toDomain(inventoryMovement)
      })
      return inventoryMovements
    } catch (error) {
      console.error('Error when searching for inventory movements by date range:', error)
      throw error
    }
  }
}
