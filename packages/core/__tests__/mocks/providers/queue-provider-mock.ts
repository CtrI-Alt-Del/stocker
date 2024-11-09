import type { IQueueProvider } from '../../../src/interfaces'
import type { JobKey } from '../../../src/types'

export class QueueProviderMock implements IQueueProvider {
  jobs: Array<{ key: string; data: unknown }> = []

  push(key: JobKey, data: unknown): void {
    this.jobs.push({ key, data })
  }

  process(): void {
    throw new Error('Method not implemented.')
  }
}
