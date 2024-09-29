import type { BatchDto } from '../../dtos'
import { NotFoundError } from '../../errors'
import type { IBatchesRepository } from '../../interfaces'

type Request = {
  batchDto: Partial<BatchDto>
  batchId: string
}

export class UpdateBatchUseCase {
  private readonly batchesRepository: IBatchesRepository
  constructor(BatchesRepository: IBatchesRepository) {
    this.batchesRepository = BatchesRepository
  }

  async execute({ batchDto, batchId }: Request) {
    console.log({ batchId })
    const batch = await this.batchesRepository.findById(batchId)
    console.log({ batch })
    if (!batch) {
      throw new NotFoundError('Lote não encontrado')
    }
    const updatedBatch = batch.update(batchDto)
    await this.batchesRepository.update(updatedBatch)
  }
}
