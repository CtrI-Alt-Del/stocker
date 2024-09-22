export type InventoryMovementDto = {
  id?: string
  movementType: string
  itemsCount: number
  responsibleId: string
  productId: string
  registeredAt: Date
  remark?: string
}
