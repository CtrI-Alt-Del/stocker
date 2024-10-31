export interface IEmailProvider {
  sendPasswordResetEmail(confirmationToken: string): Promise<void>
}
