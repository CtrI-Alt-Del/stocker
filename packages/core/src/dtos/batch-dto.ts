export type BatchDto = {
  id?: string
  code: string
  itemsCount: number
  productId: string
  expirationDate?: string
  maximumDaysToExpiration?: number | null
  resgisteredAt?: Date
}
