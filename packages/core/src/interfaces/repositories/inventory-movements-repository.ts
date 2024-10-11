import type { InventoryMovement } from '../../domain/entities'
import type { FindByDateRangeParams, InventoryMovementsListParams } from '../../types'

export interface IInventoryMovementsRepository {
  add(inventoryMovement: InventoryMovement): Promise<void>
  findMany(
    params: InventoryMovementsListParams,
  ): Promise<{ inventoryMovements: InventoryMovement[]; count: number }>
  countItems(): Promise<number>
  countInbound(): Promise<number>
  countOutbound(): Promise<number>
  findByDateRange(params: FindByDateRangeParams): Promise<InventoryMovement[]>
}
