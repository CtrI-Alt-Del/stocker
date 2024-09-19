import type { InventoryMovement } from '../../domain/entities'

export interface IInventoryMovementsRepository {
  add(inventoryMovement: InventoryMovement): Promise<void>
  findManyByProductId(productId: string): Promise<InventoryMovement[]>
  count(): Promise<number>
}
