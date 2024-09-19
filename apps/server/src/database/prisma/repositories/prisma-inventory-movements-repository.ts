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
      const prismaInventoryMovements = this.mapper.toPrisma(inventoryMovement)

      prisma.inventoryMovement.create({
        data: {
          id: prismaInventoryMovements.id,
          type: prismaInventoryMovements.type,
          items_count: prismaInventoryMovements.items_count,
          user_id: prismaInventoryMovements.user_id,
          product_id: prismaInventoryMovements.product_id,
          registered_at: prismaInventoryMovements.registered_at,
        },
      })
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async findMany({ page }: InventoryMovementsListParams): Promise<InventoryMovement[]> {
    try {
      const prismaInventoryMovements = await prisma.inventoryMovement.findMany({
        take: PAGINATION.itemsPerPage,
        skip: (page - 1) * PAGINATION.itemsPerPage,
      })
      if (!prismaInventoryMovements) return []

      const inventoryMovements = prismaInventoryMovements.map((inventoryMovement) => {
        return this.mapper.toDomain(inventoryMovement)
      })
      return inventoryMovements
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async findManyByProductId(productId: string): Promise<InventoryMovement[] | []> {
    try {
      const prismaInventoryMovements = await prisma.inventoryMovement.findMany({
        where: {
          product_id: productId,
        },
      })
      if (!prismaInventoryMovements) return []

      const inventoryMovements = prismaInventoryMovements.map((inventoryMovement) => {
        return this.mapper.toDomain(inventoryMovement)
      })
      return inventoryMovements
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async count(): Promise<number> {
    try {
      return await prisma.inventoryMovement.count()
    } catch (error) {
      throw new PrismaError(error)
    }
  }
}
