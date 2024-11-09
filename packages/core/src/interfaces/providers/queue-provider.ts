export interface IQueueProvider {
  push(
    key: 'send-stock-level-notification',
    data: { productId: string; companyId: string },
  ): void
  push(
    key: 'send-password-reset-email',
    data: { recipientEmail: string; confirmationToken: string },
  ): void
  push(
    key: 'send-welcome-employee-email',
    data: { employeeEmail: string; employeeName: string; companyName: string },
  ): void
  process(): void
}
