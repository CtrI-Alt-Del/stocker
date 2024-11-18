import { beforeEach, describe, expect, it } from 'vitest'

import { SuppliersRepositoryMock } from '../../../../__tests__/mocks/repositories'
import { NotFoundError } from '../../../errors'
import { SuppliersFaker } from '../../../../__tests__/fakers'
import { DeleteSuppliersUseCase } from '../delete-supplier-use-case'

let useCase: DeleteSuppliersUseCase
let suppliersRepository: SuppliersRepositoryMock

describe('Delete supplier use case', () => {
  beforeEach(() => {
    suppliersRepository = new SuppliersRepositoryMock()
    useCase = new DeleteSuppliersUseCase(suppliersRepository)
  })

  it('should delete many suppliers at once', async () => {
    const fakeSuppliers = SuppliersFaker.fakeMany(5)

    for (const fakeSupplier of fakeSuppliers) {
      await suppliersRepository.add(fakeSupplier)
    }

    expect(suppliersRepository.suppliers).toHaveLength(5)

    await useCase.execute({
      suppliersIds: fakeSuppliers.map((fakeSupplier) => fakeSupplier.id),
    })

    expect(suppliersRepository.suppliers).toHaveLength(0)
  })

  it('should not delete suppliers that do not exist', async () => {
    const fakeSuppliers = SuppliersFaker.fakeMany(5)

    for (const fakeSupplier of fakeSuppliers) {
      await suppliersRepository.add(fakeSupplier)
    }

    expect(async () => {
      await useCase.execute({
        suppliersIds: [
          ...fakeSuppliers.map((fakeSupplier) => fakeSupplier.id),
          SuppliersFaker.fake().id,
        ],
      })
    }).rejects.toThrowError(NotFoundError)
  })
})
