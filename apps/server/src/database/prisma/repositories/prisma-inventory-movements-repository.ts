import type { InventoryMovement } from '@stocker/core/entities'
import type { IInventoryMovementsRepository } from '@stocker/core/interfaces'
import type { InventoryMovementsListParams } from '@stocker/core/types'
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

  async findMany({ page, productId }: InventoryMovementsListParams) {
    try {
      const whereCondition = productId !== 'all' ? { product_id: productId } : undefined

      const count = await prisma.inventoryMovement.count({ where: whereCondition })

      const prismaInventoryMovements = await prisma.inventoryMovement.findMany({
        take: PAGINATION.itemsPerPage,
        skip: (page - 1) * PAGINATION.itemsPerPage,
        where: whereCondition,
        orderBy: {
          registered_at: 'desc',
        },
        include: {
          User: {
            select: {
              name: true,
            },
          },
          Product: {
            select: {
              name: true,
            },
          },
        },
      })

      const inventoryMovements = prismaInventoryMovements.map((inventoryMovement) => {
        return this.mapper.toDomain(inventoryMovement)
      })

      return {
        inventoryMovements,
        count,
      }
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  findAllByDateRange(
    startDate: Date,
    endDate: Date,
    productId?: string,
  ): Promise<InventoryMovement[]> {
    throw new Error('Method not implemented.')
  }

  async count(): Promise<number> {
    try {
      return await prisma.inventoryMovement.count()
    } catch (error) {
      throw new PrismaError(error)
    }
  }
}
