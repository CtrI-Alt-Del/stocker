import { beforeEach, describe, expect, it } from 'vitest'

import { SuppliersRepositoryMock } from '../../../../__tests__/mocks/repositories'
import { SuppliersFaker } from '../../../../__tests__/fakers'
import { UpdateSupplierUseCase } from '../update-supplier-use-case'
import { NotFoundError } from '../../../errors'

let useCase: UpdateSupplierUseCase
let suppliersRepository: SuppliersRepositoryMock

describe('Update supplier use case', () => {
  beforeEach(() => {
    suppliersRepository = new SuppliersRepositoryMock()
    useCase = new UpdateSupplierUseCase(suppliersRepository)
  })

  it('should not update supplier if the supplier does not exist', async () => {
    const fakeSupplier = SuppliersFaker.fake()

    await expect(
      useCase.execute({
        supplierDto: fakeSupplier.dto,
        supplierId: fakeSupplier.id,
      })
    ).rejects.toThrowError(NotFoundError)
  })

  it('should update supplier', async () => {
    const fakeSupplier = SuppliersFaker.fake({
      name: 'original name',
      email: 'email@gmail.com',
      cnpj: '28.193.784/0001-49',
      phone: '12982567488',
      companyId: 'company-1',
    })
    await suppliersRepository.add(fakeSupplier)

    await useCase.execute({
      supplierDto: {
        name: 'updated name',
        email: 'updateemail@gmail.com',
        phone: '12982785922',
      },
      supplierId: fakeSupplier.id,
    })

    expect(suppliersRepository.suppliers[0]?.name).toEqual('updated name')
    expect(suppliersRepository.suppliers[0]?.email).toEqual('updateemail@gmail.com')
    expect(suppliersRepository.suppliers[0]?.phone).toEqual('12982785922')
    expect(suppliersRepository.suppliers[0]?.companyId).toEqual('company-1')
  })
})
