import type { InventoryMovement } from '../../domain/entities'
import type { InventoryMovementsListParams } from '../../types'

export type FindManyParams = {
  page: number
}

export interface IInventoryMovementsRepository {
  add(inventoryMovement: InventoryMovement): Promise<void>
  findMany(params: InventoryMovementsListParams): Promise<InventoryMovement[]>
  findManyByProductId(productId: string): Promise<InventoryMovement[]>
  count(): Promise<number>
}
