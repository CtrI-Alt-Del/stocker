import type { IEmailProvider, IJob } from '@stocker/core/interfaces'
import type { JobKey } from '@stocker/core/types'

type Payload = {
  employeeName: string
  companyName: string
}

export class SendWelcomeEmployeeEmailJob implements IJob {
  readonly key: JobKey = 'send-welcome-employee-email'

  constructor(private readonly emailProvider: IEmailProvider) {}

  async handle({ employeeName, companyName }: Payload) {
    await this.emailProvider.sendWelcomeEmployeeEmail(employeeName, companyName)
  }
}
