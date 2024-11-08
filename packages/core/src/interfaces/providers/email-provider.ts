export interface IEmailProvider {
  sendPasswordResetEmail(
    recipientEmail: string,
    confirmationToken: string,
  ): Promise<boolean>
  sendWelcomeEmployeeEmail(
    employeeEmail: string,
    employeeName: string,
    companyName: string,
  ): Promise<boolean>
}
