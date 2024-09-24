import { InventoryMovement } from '@stocker/core/entities'
import type { PrismaInventoryMovement } from '../types'

export class PrismaInventoryMovementsMapper {
  toDomain(prismaInventoryMovements: PrismaInventoryMovement): InventoryMovement {
    const inventoryMovement = InventoryMovement.create({
      id: prismaInventoryMovements.id,
      movementType: prismaInventoryMovements.movement_type.toLowerCase(),
      itemsCount: prismaInventoryMovements.items_count,
      responsibleId: prismaInventoryMovements.user_id,
      productId: prismaInventoryMovements.product_id,
      registeredAt: prismaInventoryMovements.registered_at,
    })

    if (prismaInventoryMovements.User)
      inventoryMovement.responsibleData = prismaInventoryMovements.User
    return inventoryMovement
  }

  toPrisma(inventoryMovement: InventoryMovement): PrismaInventoryMovement {
    const inventoryMovementDto = inventoryMovement.dto

    return {
      id: inventoryMovement.id,
      movement_type:
        inventoryMovement.movementType === 'inbound' ? 'INBOUND' : 'OUTBOUND',
      product_id: inventoryMovementDto.productId,
      items_count: inventoryMovement.itemsCount,
      user_id: inventoryMovement.responsibleId,
      registered_at: inventoryMovement.registeredAt,
    }
  }
}
