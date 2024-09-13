import type { Batch } from '#domain/entities'

export interface IBatchesRepository {
  add(batch: Batch): Promise<void>
  count(): Promise<number>
  updateManyItemsCount(batches: Batch[]): Promise<void>
  deleteMany(batchesIds: string[]): Promise<void>
}
