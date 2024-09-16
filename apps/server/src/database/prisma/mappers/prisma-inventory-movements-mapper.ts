import { InventoryMovement } from '@stocker/core/entities'
import type { PrismaInventoryMovement } from '../types'

export class PrismaInventoryMovementsMapper {
    toDomain(prismaInventoryMovements: PrismaInventoryMovement): InventoryMovement {
        return InventoryMovement.create({
            id: prismaInventoryMovements.id,
            movementType: prismaInventoryMovements.movementType,
            itemsQuantity: prismaInventoryMovements.itemsQuantity,
            responsibleId: prismaInventoryMovements.responsibleId,
            productId: prismaInventoryMovements.productId,
            companyId: prismaInventoryMovements.companyId, 
            registeredAt: prismaInventoryMovements.registeredAt
        })
    }

    toPrisma(inventoryMovement: InventoryMovement): PrismaInventoryMovement {
        const inventoryMovementDto = inventoryMovement.dto

        return {
            id: inventoryMovement.id,
            movementType: inventoryMovementDto.movementType,
            itemsQuantity: inventoryMovementDto.itemsQuantity,
            responsibleId: inventoryMovementDto.responsibleId,
            productId: inventoryMovementDto.productId,
            companyId: inventoryMovementDto.companyId, 
            registeredAt: inventoryMovementDto.registeredAt
        }
    }
}