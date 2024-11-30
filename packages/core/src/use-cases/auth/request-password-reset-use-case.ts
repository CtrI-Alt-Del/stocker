import type { ICryptoProvider, IQueueProvider, IUsersRepository } from '../../interfaces'

export class RequestPasswordResetUseCase {
  constructor(
    private readonly usersRepository: IUsersRepository,
    private readonly cryptoProvider: ICryptoProvider,
    private readonly queueProvider: IQueueProvider,
  ) {}

  async execute(recipientEmail: string) {
    const user = await this.usersRepository.findByEmail(recipientEmail)
    if (!user) return
    const confirmationToken = await this.cryptoProvider.token()

    this.queueProvider.push('send-password-reset-email', {
      recipientEmail,
      confirmationToken,
    })

    return confirmationToken
  }
}
