export type InventoryMovementDto = {
  id?: string
  movementType: string
  itemsQuantity: number
  responsibleId: string
  productId: string
  registeredAt: Date
}
