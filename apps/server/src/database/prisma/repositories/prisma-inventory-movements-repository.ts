import type { InventoryMovement, Product } from '@stocker/core/entities'
import type { IInventoryMovementsRepository } from '@stocker/core/interfaces'

import { prisma } from '../prisma-client'
import { PrismaInventoryMovementsMapper } from '../mappers'
import { PrismaError } from '../prisma-error'

export class PrismaInventoryMovementsRepository implements IInventoryMovementsRepository {
  private readonly mapper: PrismaInventoryMovementsMapper = new PrismaInventoryMovementsMapper()

  async add(inventoryMovement: InventoryMovement): Promise<void> {
    try {
      const prismaInventoryMovements = this.mapper.toPrisma(inventoryMovement)

      prisma.inventoryMovement.create({
        data: {
          id: prismaInventoryMovements.id,
          movementType: prismaInventoryMovements.movementType,
          itemsQuantity: prismaInventoryMovements.itemsQuantity,
          responsibleId: prismaInventoryMovements.responsibleId,
          productId: prismaInventoryMovements.productId,
          companyId: prismaInventoryMovements.companyId, 
          registeredAt: prismaInventoryMovements.registeredAt
        },
      })
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

      const inventoryMovements = prismaInventoryMovements.forEach((inventoryMovement: InventoryMovement) => {
        this.mapper.toDomain(inventoryMovement)
      })
      return inventoryMovements

    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async count(): Promise<number> {
    try {
      return await prisma.inventoryMovement.count()
    } catch(error) {
      throw new PrismaError(error)
    }
  }
}