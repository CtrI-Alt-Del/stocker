export type ExpirationDateNotificationDto = {
  id?: string
  batch: {
    id: string
    code: string
  }
  createdAt: Date
}
