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

    expect(async () => {
      await useCase.execute({
        supplierDto: fakeSupplier.dto,
        supplierId: fakeSupplier.id,
      })
    }).rejects.toThrowError(NotFoundError)
  })

  it('should update supplier', async () => {
    const fakeSupplier = SuppliersFaker.fake({
      name: 'original name',
      email: 'email@gmail.com',
      cnpj: '28.193.784/0001-49',
      phone: '12982567488',
      companyId: 'original companyId',
    })
    await supplierRepository.add(fakeSupplier)

    expect(supplierRepository.suppliers[0]?.name).toEqual('original name')
    expect(supplierRepository.suppliers[0]?.email).toEqual('email@gmail.com')
    expect(supplierRepository.suppliers[0]?.cnpj).toEqual('28.193.784/0001-49')
    expect(supplierRepository.suppliers[0]?.phone).toEqual('12982567488')
    expect(supplierRepository.suppliers[0]?.companyId).toEqual('original companyId')

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
    expect(supplierRepository.suppliers[0]?.companyId).toEqual('original companyId')
  })


  it('should not update supplier with the same email', async () => {
    const fakeSupplier = SuppliersFaker.fake({
      name: 'original name',
      email: 'email@gmail.com',
      cnpj: '28.193.784/0001-49',
      phone: '12982567488',
      companyId: 'original companyId',
    })
    await supplierRepository.add(fakeSupplier)

    expect(supplierRepository.suppliers[0]?.name).toEqual('original name')
    expect(supplierRepository.suppliers[0]?.email).toEqual('email@gmail.com')
    expect(supplierRepository.suppliers[0]?.cnpj).toEqual('28.193.784/0001-49')
    expect(supplierRepository.suppliers[0]?.phone).toEqual('12982567488')
    expect(supplierRepository.suppliers[0]?.companyId).toEqual('original companyId')

    const fakeSupplier2 = SuppliersFaker.fake({
      name: 'original name2',
      email: 'email2@gmail.com',
      cnpj: '28.193.784/0001-50',
      phone: '12982567489',
      companyId: 'original companyId2',
    })
    await supplierRepository.add(fakeSupplier2)

    expect(supplierRepository.suppliers[1]?.name).toEqual('original name2')
    expect(supplierRepository.suppliers[1]?.email).toEqual('email2@gmail.com')
    expect(supplierRepository.suppliers[1]?.cnpj).toEqual('28.193.784/0001-50')
    expect(supplierRepository.suppliers[1]?.phone).toEqual('12982567489')
    expect(supplierRepository.suppliers[1]?.companyId).toEqual('original companyId2')

    await expect(
      useCase.execute({
        supplierDto: {
          name: 'updated name',
          email: 'email@gmail.com',
          phone: '12982785922',
        },
        supplierId: fakeSupplier2.id,
      }),
    ).rejects.toThrowError(new ConflictError('Esse Email já está em uso'))

    expect(supplierRepository.suppliers[0]?.name).toEqual('original name')
    expect(supplierRepository.suppliers[0]?.email).toEqual('email@gmail.com')
    expect(supplierRepository.suppliers[0]?.cnpj).toEqual('28.193.784/0001-49')
    expect(supplierRepository.suppliers[0]?.phone).toEqual('12982567488')
    expect(supplierRepository.suppliers[0]?.companyId).toEqual('original companyId')

    expect(supplierRepository.suppliers[1]?.name).toEqual('original name2')
    expect(supplierRepository.suppliers[1]?.email).toEqual('email2@gmail.com')
    expect(supplierRepository.suppliers[1]?.cnpj).toEqual('28.193.784/0001-50')
    expect(supplierRepository.suppliers[1]?.phone).toEqual('12982567489')
    expect(supplierRepository.suppliers[1]?.companyId).toEqual('original companyId2')
  })


  it('should not update supplier with the same CNPJ', async () => {
    const fakeSupplier = SuppliersFaker.fake({
      name: 'original name',
      email: 'email@gmail.com',
      cnpj: '28.193.784/0001-49',
      phone: '12982567488',
      companyId: 'original companyId',
    })
    await supplierRepository.add(fakeSupplier)

    expect(supplierRepository.suppliers[0]?.name).toEqual('original name')
    expect(supplierRepository.suppliers[0]?.email).toEqual('email@gmail.com')
    expect(supplierRepository.suppliers[0]?.cnpj).toEqual('28.193.784/0001-49')
    expect(supplierRepository.suppliers[0]?.phone).toEqual('12982567488')
    expect(supplierRepository.suppliers[0]?.companyId).toEqual('original companyId')

    const fakeSupplier2 = SuppliersFaker.fake({
      name: 'original name2',
      email: 'email2@gmail.com',
      cnpj: '28.193.784/0001-50',
      phone: '12982567489',
      companyId: 'original companyId2',
    })
    await supplierRepository.add(fakeSupplier2)

    expect(supplierRepository.suppliers[1]?.name).toEqual('original name2')
    expect(supplierRepository.suppliers[1]?.email).toEqual('email2@gmail.com')
    expect(supplierRepository.suppliers[1]?.cnpj).toEqual('28.193.784/0001-50')
    expect(supplierRepository.suppliers[1]?.phone).toEqual('12982567489')
    expect(supplierRepository.suppliers[1]?.companyId).toEqual('original companyId2')

    await expect(
      useCase.execute({
        supplierDto: {
          name: 'updated name',
          email: 'email2@gmail.com',
          cnpj: '28.193.784/0001-49',
          phone: '12982567922',
        },
        supplierId: fakeSupplier2.id,
      }),
    ).rejects.toThrowError(new ConflictError('Esse CNPJ já está em uso'))

    expect(supplierRepository.suppliers[0]?.name).toEqual('original name')
    expect(supplierRepository.suppliers[0]?.email).toEqual('email@gmail.com')
    expect(supplierRepository.suppliers[0]?.cnpj).toEqual('28.193.784/0001-49')
    expect(supplierRepository.suppliers[0]?.phone).toEqual('12982567488')
    expect(supplierRepository.suppliers[0]?.companyId).toEqual('original companyId')

    expect(supplierRepository.suppliers[1]?.name).toEqual('original name2')
    expect(supplierRepository.suppliers[1]?.email).toEqual('email2@gmail.com')
    expect(supplierRepository.suppliers[1]?.cnpj).toEqual('28.193.784/0001-50')
    expect(supplierRepository.suppliers[1]?.phone).toEqual('12982567489')
    expect(supplierRepository.suppliers[1]?.companyId).toEqual('original companyId2')
  })


  it('should not update supplier with the same telefone', async () => {
    const fakeSupplier = SuppliersFaker.fake({
      name: 'original name',
      email: 'email@gmail.com',
      cnpj: '28.193.784/0001-49',
      phone: '12982567488',
      companyId: 'original companyId',
    })
    await supplierRepository.add(fakeSupplier)

    expect(supplierRepository.suppliers[0]?.name).toEqual('original name')
    expect(supplierRepository.suppliers[0]?.email).toEqual('email@gmail.com')
    expect(supplierRepository.suppliers[0]?.cnpj).toEqual('28.193.784/0001-49')
    expect(supplierRepository.suppliers[0]?.phone).toEqual('12982567488')
    expect(supplierRepository.suppliers[0]?.companyId).toEqual('original companyId')

    const fakeSupplier2 = SuppliersFaker.fake({
      name: 'original name2',
      email: 'email2@gmail.com',
      cnpj: '28.193.784/0001-50',
      phone: '12982567489',
      companyId: 'original companyId2',
    })
    await supplierRepository.add(fakeSupplier2)

    expect(supplierRepository.suppliers[1]?.name).toEqual('original name2')
    expect(supplierRepository.suppliers[1]?.email).toEqual('email2@gmail.com')
    expect(supplierRepository.suppliers[1]?.cnpj).toEqual('28.193.784/0001-50')
    expect(supplierRepository.suppliers[1]?.phone).toEqual('12982567489')
    expect(supplierRepository.suppliers[1]?.companyId).toEqual('original companyId2')

    await expect(
      useCase.execute({
        supplierDto: {
          name: 'updated name',
          email: 'email2@gmail.com',
          phone: '12982567488',
        },
        supplierId: fakeSupplier2.id,
      }),
    ).rejects.toThrowError(new ConflictError('Esse telefone já está em uso'))

    expect(supplierRepository.suppliers[0]?.name).toEqual('original name')
    expect(supplierRepository.suppliers[0]?.email).toEqual('email@gmail.com')
    expect(supplierRepository.suppliers[0]?.cnpj).toEqual('28.193.784/0001-49')
    expect(supplierRepository.suppliers[0]?.phone).toEqual('12982567488')
    expect(supplierRepository.suppliers[0]?.companyId).toEqual('original companyId')

    expect(supplierRepository.suppliers[1]?.name).toEqual('original name2')
    expect(supplierRepository.suppliers[1]?.email).toEqual('email2@gmail.com')
    expect(supplierRepository.suppliers[1]?.cnpj).toEqual('28.193.784/0001-50')
    expect(supplierRepository.suppliers[1]?.phone).toEqual('12982567489')
    expect(supplierRepository.suppliers[1]?.companyId).toEqual('original companyId2')
  })
})
