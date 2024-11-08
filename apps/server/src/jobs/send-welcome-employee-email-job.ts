import { emailProvider } from '@/providers'
import type { IJob } from '@stocker/core/interfaces'
import type { JobKey } from '@stocker/core/types'

type Payload = {
  employeeEmail: string
  employeeName: string
  companyName: string
}

export class SendWelcomeEmployeeEmailJob implements IJob {
  readonly key: JobKey = 'send-welcome-employee-email'

  async handle({ employeeEmail, employeeName, companyName }: Payload) {
    await emailProvider.sendWelcomeEmployeeEmail(employeeEmail, employeeName, companyName)
  }
}
