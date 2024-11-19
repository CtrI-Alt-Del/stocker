import type { InventoryMovementType } from './inventory-movement-type'

export type InventoryMovementsListParams = {
  page?: number
  companyId?:string
  startDate?: Date
  endDate?: Date
  employeeId?: string
  movementType?: InventoryMovementType
  productId?: string
}
