import type { IEmailProvider, IJob } from '@stocker/core/interfaces'
import type { JobKey } from '@stocker/core/types'

type Payload = {
  recipientEmail: string
  confirmationToken: string
}

export class SendPasswordResetEmailJob implements IJob {
  readonly key: JobKey = 'send-password-reset-email'

  constructor(private readonly emailProvider: IEmailProvider) {}

  async handle({ recipientEmail, confirmationToken }: Payload) {
    await this.emailProvider.sendPasswordResetEmail(recipientEmail, confirmationToken)
  }
}
