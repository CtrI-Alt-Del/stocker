import { FileStorageProvider } from './file-storage-provider'
import { CryptoProvider } from './crypto-provider'
import { EmailProvider } from './email-provider'
import { QueueProvider } from './queue-provider'

import { SendPasswordResetEmailJob, SendWelcomeEmployeeEmailJob } from '@/jobs'

export const fileStorageProvider = new FileStorageProvider()
export const cryptoProvider = new CryptoProvider()
export const emailProvider = new EmailProvider()
export const queueProvider = new QueueProvider([
  new SendPasswordResetEmailJob(emailProvider),
  new SendWelcomeEmployeeEmailJob(emailProvider),
])
