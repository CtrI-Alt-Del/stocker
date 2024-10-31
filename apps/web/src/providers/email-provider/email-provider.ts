import type { IEmailProvider } from '@stocker/core/interfaces'

export class EmailProvider implements IEmailProvider {
  sendPasswordResetEmail(
    recipientEmail: string,
    confirmationToken: string,
  ): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
