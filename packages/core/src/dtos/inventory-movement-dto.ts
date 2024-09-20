export type InventoryMovementDto = {
  description?: string
  id?: string
  movementType: string
  itemsQuantity: number
  responsibleId: string
  productId: string
  registeredAt: Date
  expireDate?: Date
  batchCode?: string
}
