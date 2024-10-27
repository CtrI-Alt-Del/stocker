export type StockLevelNotificationDto = {
  id?: string
  companyId: string
  product: {
    id: string
    name: string
    code: string
  }
  createdAt: Date
}
