export type BatchDto = {
  id?: string
  code: string
  itemsCount: number
  productId: string
  maximumDaysToExpiration?: number | null
  expirationDate?: Date
  registeredAt?: Date
}
