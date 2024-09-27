export type InventoryMovementDto = {
  id?: string
  movementType: string
  itemsCount: number
  registeredAt: Date
  responsible: {
    id: string
    name?: string
  }
  product: {
    id: string
    name?: string
  }
  remark?: string
}
