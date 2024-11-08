import type { InventoryMovement } from '../../domain/entities'
import type { FindByDateRangeParams, InventoryMovementsListParams } from '../../types'

export interface IInventoryMovementsRepository {
  add(inventoryMovement: InventoryMovement): Promise<void>
  addMany(inventoryMovements: InventoryMovement[]): Promise<void>
  findMany(
    params: InventoryMovementsListParams,
  ): Promise<{ inventoryMovements: InventoryMovement[]; count: number }>
  countItems(): Promise<number>
  countInbound(companyId:string): Promise<number>
  countOutbound(companyId:string): Promise<number>
  findByDateRange(params: FindByDateRangeParams): Promise<InventoryMovement[]>
}
