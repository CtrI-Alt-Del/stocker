import type { InventoryMovement } from '#domain/entities'

export interface IInventoryMovementsRepository {
  add(inventoryMovement: InventoryMovement): Promise<void>
  count(): Promise<number>
}
