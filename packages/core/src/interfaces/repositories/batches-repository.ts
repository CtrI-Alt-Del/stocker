import type { Batch } from '#domain/entities'

export interface IBatchesRepository {
  add(batch: Batch): Promise<void>
  count(): Promise<number>
  deleteMany(batchesIds: string[]): Promise<void>
}
