import type { ProductDto } from './product-dto'
import type { UserDto } from './user-dto'

export type InventoryMovementDto = {
  id?: string
  movementType: string
  itemsCount: number
  registeredAt: Date
  responsible: {
    id: string
    dto?: UserDto
  }
  product: {
    id: string
    dto?: ProductDto
  }
  remark?: string
}
