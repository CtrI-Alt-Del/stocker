import { InventoryMovement } from '@stocker/core/entities'
import type { PrismaInventoryMovement } from '../types'

export class PrismaInventoryMovementsMapper {
    toDomain(prismaInventoryMovements: PrismaInventoryMovement): InventoryMovement {
        return InventoryMovement.create({
            id: prismaInventoryMovements.id,
            movementType: prismaInventoryMovements.type,
            itemsQuantity: prismaInventoryMovements.items_count,
            responsibleId: prismaInventoryMovements.user_id,
            productId: prismaInventoryMovements.id,
            registeredAt: prismaInventoryMovements.registered_at
        })
    }

    toPrisma(inventoryMovement: InventoryMovement): PrismaInventoryMovement {
        const inventoryMovementDto = inventoryMovement.dto

        return {
            id: inventoryMovement.id,
            type: inventoryMovement.movementType === "inbound" ? "INBOUND" : "OUTBOUND",
            product_id: inventoryMovementDto.productId,
            items_count: inventoryMovement.itemsQuantity,
            user_id: inventoryMovement.responsibleId,
            registered_at: inventoryMovement.registeredAt,
        }
    }
}