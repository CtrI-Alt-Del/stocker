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
    await this.batchesRepository.deleteMany(batchesIds)
  }
}
