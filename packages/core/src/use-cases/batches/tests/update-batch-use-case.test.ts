import { beforeEach, describe, expect, it } from 'vitest'
import { UpdateBatchUseCase } from '../update-batch-use-case'
import { BatchesRepositoryMock } from '../../../../__tests__/mocks/repositories'
import { BatchesFaker } from '../../../../__tests__/fakers'
import { NotFoundError } from '../../../errors'

let useCase: UpdateBatchUseCase
let batchesRepository: BatchesRepositoryMock

describe('Update Batch use case', () => {
  beforeEach(() => {
    batchesRepository = new BatchesRepositoryMock()
    useCase = new UpdateBatchUseCase(batchesRepository)
  })

  it('should not update batch if the batch does not exist', async () => {
    const fakeBatch = BatchesFaker.fake()

    expect(async () => {
      await useCase.execute({ batchDto: fakeBatch.dto, batchId: fakeBatch.id })
    }).rejects.toThrowError(NotFoundError)
  })

  it('should update batch', async () => {
    const fakeBatch = BatchesFaker.fake({
      code: 'original code',
      itemsCount: 5,
    })
    await batchesRepository.add(fakeBatch)

    expect(batchesRepository.batches[0]?.code).toEqual('original code')
    expect(batchesRepository.batches[0]?.itemsCount).toEqual(5)

    await useCase.execute({
      batchDto: { itemsCount: 10 },
      batchId: fakeBatch.id,
    })

    expect(batchesRepository.batches[0]?.code).toEqual('original code')
    expect(batchesRepository.batches[0]?.itemsCount).toBe(10)
  })
})
