export interface IEmailProvider {
  sendPasswordResetEmail(
    recipientEmail: string,
    confirmationToken: string,
  ): Promise<boolean>
  sendWelcomeEmployeeEmail(employeeName: string, companyName: string): Promise<boolean>
}
