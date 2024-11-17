import { beforeEach, describe, expect, it } from 'vitest'
import { SuppliersRepositoryMock } from '../../../../__tests__/mocks/repositories'
import { SuppliersFaker } from '../../../../__tests__/fakers'
import { ListSuplliersUseCase } from '../list-suppliers-use-case'
import { PAGINATION } from '../../../constants'
import type { Supplier } from '../../../domain/entities'

let useCase: ListSuplliersUseCase
let suppliersRepository: SuppliersRepositoryMock
let fakeSuppliers: Supplier[] = []

describe('List users use case', () => {
  beforeEach(async () => {
    suppliersRepository  = new SuppliersRepositoryMock()
    useCase = new ListSuplliersUseCase(suppliersRepository)
    fakeSuppliers = SuppliersFaker.fakeMany(20)
    for (const fakeSupplier of fakeSuppliers) {
      await suppliersRepository.add(fakeSupplier)
    }
  })

  const companyId = ''
  it(`should list ${PAGINATION.itemsPerPage} suppliers per page`, async () => {
    let pagination = await useCase.execute({ page: 1, companyId })
    expect(pagination.items).toHaveLength(PAGINATION.itemsPerPage)

    pagination = await useCase.execute({ page: 2, companyId })
    expect(pagination.items).toHaveLength(PAGINATION.itemsPerPage)
  })

  it('should return the count of suppliers', async () => {
    const pagination = await useCase.execute({ page: 1, companyId })
    expect(pagination.itemsCount).toBe(fakeSuppliers.length)
  })

  it('should list the suppliers according to the current page', async () => {
    let pagination = await useCase.execute({ page: 1, companyId })

    expect(pagination.items).toEqual(
      fakeSuppliers.slice(0, 10).map((user) => user.dto),
    )

    pagination = await useCase.execute({ page: 2, companyId })

    expect(pagination.items).toEqual(
      fakeSuppliers.slice(10, 20).map((user) => user.dto),
    )
  })
})
