import type { InventoryMovement } from '../../domain/entities'
import type { FindByDateRangeParams, InventoryMovementsListParams } from '../../types'

export interface IInventoryMovementsRepository {
  add(inventoryMovement: InventoryMovement): Promise<void>
  addMany(inventoryMovements: InventoryMovement[]): Promise<void>
  findAllByCompany(companyId: string): Promise<InventoryMovement[]>
  findMany(
    params: InventoryMovementsListParams,
  ): Promise<{ inventoryMovements: InventoryMovement[]; count: number }>
  countItems(): Promise<number>
  count(companyId: string): Promise<number>
  countInbound(companyId: string): Promise<number>
  countOutbound(companyId: string): Promise<number>
  findByDateRange(params: FindByDateRangeParams): Promise<InventoryMovement[]>
}
