import { beforeEach, describe, expect, it } from 'vitest'

import { BatchesRepositoryMock } from '../../../../__tests__/mocks/repositories'
import { NotFoundError } from '../../../errors'
import { BatchesFaker } from '../../../../__tests__/fakers'
import { FileStorageProviderMock } from '../../../../__tests__/mocks/providers'
import { DeleteBatchesUseCase } from '../delete-batches-use-case'

let useCase: DeleteBatchesUseCase
let batchesRepository: BatchesRepositoryMock
let fileStorageProvider: FileStorageProviderMock

describe('Delete batches use case', () => {
  beforeEach(() => {
    batchesRepository = new BatchesRepositoryMock()
    fileStorageProvider = new FileStorageProviderMock()
    useCase = new DeleteBatchesUseCase(batchesRepository)
  })

  it('should delete many batches at once', async () => {
    const fakeBatches = BatchesFaker.fakeMany(5)

    for (const fakeBatche of fakeBatches) {
      await batchesRepository.add(fakeBatche)
    }

    expect(batchesRepository.batches).toHaveLength(5)

    await useCase.execute({
      batchesIds: fakeBatches.map((fakeBatche) => fakeBatche.id),
    })

    expect(batchesRepository.batches).toHaveLength(0)
  })

  it('should not delete batches that do not exist', async () => {
    const fakeBatches = BatchesFaker.fakeMany(5)

    for (const fakeBatch of fakeBatches) {
      await batchesRepository.add(fakeBatch)
    }

    expect(async () => {
      await useCase.execute({
        batchesIds: [
          ...fakeBatches.map((fakeBatch) => fakeBatch.id),
          BatchesFaker.fake().id,
        ],
      })
    }).rejects.toThrowError(NotFoundError)
  })
})
