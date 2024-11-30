import type { InventoryMovementType } from './inventory-movement-type'

export type InventoryMovementsListParams = {
  page?: number
  companyId?: string
  startDate?: Date
  endDate?: Date
  responsibleId?: string
  movementType?: InventoryMovementType
  productId?: string
}
