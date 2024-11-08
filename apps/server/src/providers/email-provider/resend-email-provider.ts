import { type ErrorResponse, Resend } from 'resend'

import type { IEmailProvider } from '@stocker/core/interfaces'
import { ResetPasswordTemplate, WelcomeEmployeeTemplate } from '@stocker/email/templates'

import { ENV } from '@/constants'
import { AppError } from '@stocker/core/errors'

export class ResendEmailProvider implements IEmailProvider {
  private resend: Resend

  constructor() {
    this.resend = new Resend(ENV.resendApiKey)
  }
  async sendPasswordResetEmail(
    recipientEmail: string,
    confirmationToken: string,
  ): Promise<boolean> {
    const { data, error } = await this.resend.emails.send({
      from: `${ENV.senderName} <${ENV.senderEmail}>`,
      to: [recipientEmail],
      subject: 'Pedido de redefinição de senha',
      react: ResetPasswordTemplate({
        baseUrl: ENV.webAppUrl,
        recipientEmail,
        token: confirmationToken,
      }),
    })

    if (error) {
      this.throwError(
        error,
        `Erro ao enviar e-mail de redefinição de senha para ${recipientEmail}`,
      )
    }

    return Boolean(data?.id)
  }

  async sendWelcomeEmployeeEmail(
    employeeEmail: string,
    employeeName: string,
    companyName: string,
  ): Promise<boolean> {
    const { data, error } = await this.resend.emails.send({
      from: `${ENV.senderName} <${ENV.senderEmail}>`,
      to: [employeeEmail],
      subject: 'Mensagem de boas-vindas',
      react: WelcomeEmployeeTemplate({
        baseUrl: ENV.webAppUrl,
        employeeName,
        companyName,
      }),
    })

    if (error) {
      this.throwError(
        error,
        `Erro ao enviar e-mail de boas-vindas para o funcionário ${employeeEmail}`,
      )
    }

    return Boolean(data?.id)
  }

  private throwError(error: ErrorResponse, message: string) {
    console.error('Resend error:', error)
    throw new AppError('Email error', message)
  }
}
