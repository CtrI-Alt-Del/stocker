import type { Batch } from '../../domain/entities'

export interface IBatchesRepository {
  add(batch: Batch): Promise<void>
  count(): Promise<number>
  countItems(): Promise<number>
  findById(productId: string): Promise<Batch | null>
  findManyNearToExpire(): Promise<{ batches: Batch; companyId: string }[]>
  updateManyItemsCount(batches: Batch[]): Promise<void>
  update(batch: Batch): Promise<void>
  deleteMany(batchesIds: string[]): Promise<void>
}
