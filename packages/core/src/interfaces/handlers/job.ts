import type { JobKey } from '../../types'

export interface IJob {
  key: JobKey
  handle(payload?: unknown): Promise<void>
}
