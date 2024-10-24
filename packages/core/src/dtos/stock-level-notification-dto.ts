export type StockLevelNotificationDto = {
  id?: string
  product: {
    id: string
    name: string
    code: string
  }
  createdAt: Date
}
