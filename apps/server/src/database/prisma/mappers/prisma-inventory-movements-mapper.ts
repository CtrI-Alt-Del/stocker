import { InventoryMovement } from '@stocker/core/entities'
import type { PrismaInventoryMovement } from '../types'

export class PrismaInventoryMovementsMapper {
  toDomain(prismaInventoryMovements: PrismaInventoryMovement): InventoryMovement {
    const inventoryMovement = InventoryMovement.create({
      id: prismaInventoryMovements.id,
      movementType: prismaInventoryMovements.movement_type.toLowerCase(),
      itemsCount: prismaInventoryMovements.items_count,
      responsible: {
        id: prismaInventoryMovements.user_id,
        name: prismaInventoryMovements.User?.name,
      },
      product: {
        id: prismaInventoryMovements.product_id,
        name: prismaInventoryMovements.Product?.name,
      },
      remark: prismaInventoryMovements.remark ?? undefined,
      registeredAt: prismaInventoryMovements.registered_at,
    })

    return inventoryMovement
  }

  toPrisma(inventoryMovement: InventoryMovement): PrismaInventoryMovement {
    return {
      id: inventoryMovement.id,
      movement_type:
        inventoryMovement.movementType === 'inbound' ? 'INBOUND' : 'OUTBOUND',
      items_count: inventoryMovement.itemsCount,
      registered_at: inventoryMovement.registeredAt,
      remark: inventoryMovement.remark,
      product_id: inventoryMovement.product.id,
      user_id: inventoryMovement.responsible.id,
    }
  }
}
