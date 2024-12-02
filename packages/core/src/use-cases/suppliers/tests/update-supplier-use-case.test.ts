import { beforeEach, describe, expect, it } from 'vitest'

import { SuppliersRepositoryMock } from '../../../../__tests__/mocks/repositories'
import { SuppliersFaker } from '../../../../__tests__/fakers'
import { UpdateSupplierUseCase } from '../update-supplier-use-case'
import { ConflictError, NotFoundError } from '../../../errors'

let useCase: UpdateSupplierUseCase
let supplierRepository: SuppliersRepositoryMock

describe('Update supplier use case', () => {
  beforeEach(() => {
    supplierRepository = new SuppliersRepositoryMock()
    useCase = new UpdateSupplierUseCase(supplierRepository)
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
    await supplierRepository.add(fakeSupplier)

    await useCase.execute({
      supplierDto: {
        name: 'updated name',
        email: 'updateemail@gmail.com',
        phone: '12982785922',
      },
      supplierId: fakeSupplier.id,
    })

    expect(supplierRepository.suppliers[0]?.name).toEqual('updated name')
    expect(supplierRepository.suppliers[0]?.email).toEqual('updateemail@gmail.com')
    expect(supplierRepository.suppliers[0]?.phone).toEqual('12982785922')
    expect(supplierRepository.suppliers[0]?.companyId).toEqual('company-1')
  })

  it('should not update supplier with an existing CNPJ in the same company', async () => {
    const fakeSupplier1 = SuppliersFaker.fake({
      cnpj: '28.193.784/0001-49',
      companyId: 'company-1',
    })
    await supplierRepository.add(fakeSupplier1)

    const fakeSupplier2 = SuppliersFaker.fake({
      cnpj: '28.193.784/0001-50',
      companyId: 'company-1',
    })
    await supplierRepository.add(fakeSupplier2)

    await expect(
      useCase.execute({
        supplierDto: { cnpj: '28.193.784/0001-49' },
        supplierId: fakeSupplier2.id,
      })
    ).rejects.toThrowError(new ConflictError('Esse CNPJ já está em uso'))
  })

  it('should update supplier with an existing CNPJ in a different company', async () => {
    const fakeSupplier1 = SuppliersFaker.fake({
      cnpj: '28.193.784/0001-49',
      companyId: 'company-1',
    })
    await supplierRepository.add(fakeSupplier1)

    const fakeSupplier2 = SuppliersFaker.fake({
      cnpj: '28.193.784/0001-50',
      companyId: 'company-2',
    })
    await supplierRepository.add(fakeSupplier2)

    await useCase.execute({
      supplierDto: { cnpj: '28.193.784/0001-49' },
      supplierId: fakeSupplier2.id,
    })

    expect(supplierRepository.suppliers[1]?.cnpj).toEqual('28.193.784/0001-49')
  })
})
