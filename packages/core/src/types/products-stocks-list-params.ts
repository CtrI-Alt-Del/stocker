import type { InventoryMovementType } from './inventory-movement-type'

export type ProducsStocksListParams = {
  page?: number
  startDate?: Date
  endDate?: Date
  movementType?: InventoryMovementType
}
