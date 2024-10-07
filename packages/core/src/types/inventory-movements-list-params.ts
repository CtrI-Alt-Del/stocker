import type { InventoryMovementType } from './inventory-movement-type'

export type InventoryMovementsListParams = {
  page?: number
  startDate?: Date
  endDate?: Date
  movementType?: InventoryMovementType
  productId?: string
}
