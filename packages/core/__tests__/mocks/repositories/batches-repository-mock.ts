import type { Batch } from '../../../src/domain/entities'
import type { IBatchesRepository } from '../../../src/interfaces'

export class BatchesRepositoryMock implements IBatchesRepository {
  batches: Batch[] = []

  async add(batch: Batch): Promise<void> {
    this.batches.push(batch)
  }

  async count(): Promise<number> {
    return this.batches.length
  }

  async countItems(): Promise<number> {
    return this.batches.reduce((total, batch) => {
      return total + batch.itemsCount
    }, 0)
  }

  async findById(batchId: string): Promise<Batch | null> {
    return this.batches.find((batch) => batch.id === batchId) ?? null
  }

  async updateManyItemsCount(batches: Batch[]): Promise<void> {
    for (const batch of batches) {
      await this.update(batch)
    }
  }

  async findManyNearToExpire(): Promise<Array<{ companyId: string; batches: Batch[] }>> {
    throw new Error('Method not implemented.')
  }

  async update(batch: Batch): Promise<void> {
    this.batches = this.batches.map((currentbatch) =>
      currentbatch.id === batch.id ? batch : currentbatch,
    )
  }

  async deleteMany(batchesIds: string[]): Promise<void> {
    this.batches = this.batches.filter(
      (currentBatch) => !batchesIds.includes(currentBatch.id),
    )
  }
}
