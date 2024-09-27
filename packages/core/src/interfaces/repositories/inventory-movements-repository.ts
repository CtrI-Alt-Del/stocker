import type { InventoryMovement } from '../../domain/entities'
import type { InventoryMovementsListParams } from '../../types'

export interface IInventoryMovementsRepository {
  add(inventoryMovement: InventoryMovement): Promise<void>
  findMany(
    params: InventoryMovementsListParams,
  ): Promise<{ inventoryMovements: InventoryMovement[]; count: number }>
}
