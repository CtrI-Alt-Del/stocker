import type { ICryptoProvider, IEmailProvider } from '../../interfaces'

export class RequestPasswordResetUseCase {
  constructor(
    private readonly cryptoProvider: ICryptoProvider,
    private readonly emailProvider: IEmailProvider,
  ) {}

  async execute(recipientEmail: string, passwordResetSecret: string) {
    const confirmationToken = await this.cryptoProvider.hash(passwordResetSecret)

    await this.emailProvider.sendPasswordResetEmail(recipientEmail, confirmationToken)

    return confirmationToken
  }
}
