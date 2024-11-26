import type { ProductDto } from './product-dto'

export type StockLevelNotificationDto = {
  id?: string
  companyId: string
  productDto: ProductDto
  sentAt?: Date
}
