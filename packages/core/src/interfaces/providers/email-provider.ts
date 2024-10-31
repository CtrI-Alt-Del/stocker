export interface IEmailProvider {
  sendPasswordResetEmail(recipientEmail: string, confirmationToken: string): Promise<void>
}
