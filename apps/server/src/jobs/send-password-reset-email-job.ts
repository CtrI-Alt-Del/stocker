import { emailProvider } from '@/providers'
import type { IEmailProvider, IJob } from '@stocker/core/interfaces'
import type { JobKey } from '@stocker/core/types'

type Payload = {
  recipientEmail: string
  confirmationToken: string
}

export class SendPasswordResetEmailJob implements IJob {
  readonly key: JobKey = 'send-password-reset-email'

  async handle({ recipientEmail, confirmationToken }: Payload) {
    await emailProvider.sendPasswordResetEmail(recipientEmail, confirmationToken)
  }
}
