import { NotFoundError } from '../../errors'
import type { IBatchesRepository } from '../../interfaces'

type Request = {
  batchesIds: string[]
}

export class DeleteBatchesUseCase {
  private readonly batchesRepository: IBatchesRepository

  constructor(batchesRepository: IBatchesRepository) {
    this.batchesRepository = batchesRepository
  }

  async execute({ batchesIds }: Request) {
    for (const batchId of batchesIds) {
      const batch = await this.batchesRepository.findById(batchId)
      if (!batch) throw new NotFoundError('Lote não encontrado')
    }

    await this.batchesRepository.deleteMany(batchesIds)
  }
}
