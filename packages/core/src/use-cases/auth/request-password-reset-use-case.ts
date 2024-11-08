import type { ICryptoProvider, IQueueProvider } from '../../interfaces'

export class RequestPasswordResetUseCase {
  constructor(
    private readonly cryptoProvider: ICryptoProvider,
    private readonly queueProvider: IQueueProvider,
  ) {}

  async execute(recipientEmail: string) {
    const confirmationToken = await this.cryptoProvider.token()

    this.queueProvider.push('send-password-reset-email', {
      recipientEmail,
      confirmationToken,
    })

    return confirmationToken
  }
}
