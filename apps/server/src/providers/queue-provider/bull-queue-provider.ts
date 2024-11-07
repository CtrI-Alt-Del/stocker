import Queue from 'bull'

import type { IJob, IQueueProvider } from '@stocker/core/interfaces'
import type { JobKey } from '@stocker/core/types'

type Process = {
  queue: Queue.Queue<any>
  job: IJob
}

export class BullQueueProvider implements IQueueProvider {
  private readonly processes: Process[]

  constructor(jobs: IJob[]) {
    this.processes = jobs.map((job) => ({
      queue: new Queue(job.key, { redis: 'https://more-osprey-26036.upstash.io' }),
      job: job,
    }))
  }

  push(key: JobKey, payload?: unknown): void {
    const process = this.processes.find(({ job }) => job.key === key)
    if (process) process.job.handle(payload)
  }

  process(): void {
    for (const { queue, job } of this.processes) {
      queue.add(job.handle)
      queue.on('failed', this.handleError)
    }

    console.log('🧮 Queue is processed!')
  }

  private handleError(job: IJob, queueJob: Queue.Job, error: Error) {
    console.error('Job failed, key')
    console.error(`Job key: ${job.key}`)
    if (queueJob.data) console.error(`Job payload: ${queueJob.data}`)
    console.error('Full error', error)
  }
}
