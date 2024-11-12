export type ExpirationDateNotificationDto = {
  id?: string
  companyId: string
  batch: {
    id: string
    code: string
  }
  registeredAt?: Date
  sentAt?: Date
}
