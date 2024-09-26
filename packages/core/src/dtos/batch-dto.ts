export type BatchDto = {
  id?: string
  code: string
  itemsCount: number
  productId: string
  expirationDate?: Date
  maximumDaysToExpiration?: number | null
  resgisteredAt?: Date
}
