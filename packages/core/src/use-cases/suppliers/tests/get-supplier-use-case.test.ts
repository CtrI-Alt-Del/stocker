import { beforeEach, describe, expect, it } from 'vitest'
import { GetSupplierUseCase } from '../get-supplier-use-case'
import { SuppliersRepositoryMock } from '../../../../__tests__/mocks/repositories'
import { NotAllowedError, NotFoundError } from '../../../errors'
import { SuppliersFaker } from '../../../../__tests__/fakers'

let useCase: GetSupplierUseCase
let suppliersRepository: SuppliersRepositoryMock

describe('Get supplier use case', () => {
  beforeEach(() => {
    suppliersRepository = new SuppliersRepositoryMock()
    useCase = new GetSupplierUseCase(suppliersRepository)
  })

  it('should not get a supplier if the supplier does not exist', async () => {
    const fakeSupplier = SuppliersFaker.fake()

    expect(async () => {
      await useCase.execute({ supplierId: fakeSupplier.id })
    }).rejects.toThrowError(NotFoundError)
  })

  it('should get a supplier', async () => {
    const fakeSupplier = SuppliersFaker.fake()
    await suppliersRepository.add(fakeSupplier)

    const supplier = await useCase.execute({ supplierId: fakeSupplier.id })

    expect(supplier).toEqual(fakeSupplier.dto)
  })
})
