import { ResetPasswordTemplate } from '../../../../../packages/email/src/templates'
import type { IEmailProvider } from '@stocker/core/interfaces'
import { Resend } from 'resend'
import { ApiError } from '@stocker/core/errors'
import { BROWSER_ENV } from '@/constants'
export class EmailProvider implements IEmailProvider {
  private resend: Resend
  constructor() {
    this.resend = new Resend(BROWSER_ENV.resendApiKey)
  }
  async sendPasswordResetEmail(
    recipientEmail: string,
    confirmationToken: string,
  ): Promise<void> {
      const {data,error} = await this.resend.emails.send({
        from: `${BROWSER_ENV.senderName} <${BROWSER_ENV.senderEmail}>`,
        to: [`${recipientEmail}`],
        subject: 'Pedido de redefinição de senha',
        react: ResetPasswordTemplate({ baseUrl: BROWSER_ENV.appUrl, token: confirmationToken }),
      })
      if (error) {
      console.log(error)
        
      }
  }
}
