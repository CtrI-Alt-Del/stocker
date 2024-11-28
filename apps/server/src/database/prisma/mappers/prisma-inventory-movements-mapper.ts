import { InventoryMovement } from '@stocker/core/entities'
import type { PrismaInventoryMovement } from '../types'
import { PrismaProductMapper } from './prisma-product-mapper'
import { PrismaUsersMapper } from './prisma-users-mapper'

export class PrismaInventoryMovementsMapper {
  toDomain(prismaInventoryMovement: PrismaInventoryMovement): InventoryMovement {
    const inventoryMovement = InventoryMovement.create({
      id: prismaInventoryMovement.id,
      movementType: prismaInventoryMovement.movement_type.toLowerCase(),
      itemsCount: prismaInventoryMovement.items_count,
      responsible: {
        id: prismaInventoryMovement.user_id,
      },
      product: {
        id: prismaInventoryMovement.product_id,
      },
      remark: prismaInventoryMovement.remark ?? undefined,
      registeredAt: prismaInventoryMovement.registered_at,
    })

    if (prismaInventoryMovement.Product)
      inventoryMovement.product = new PrismaProductMapper().toDomain(
        prismaInventoryMovement.Product,
      )

    if (prismaInventoryMovement.User)
      inventoryMovement.responsible = new PrismaUsersMapper().toDomain(
        prismaInventoryMovement.User,
      )

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
