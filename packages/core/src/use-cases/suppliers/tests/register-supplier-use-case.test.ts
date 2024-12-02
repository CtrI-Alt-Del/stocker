import { beforeEach, describe, expect, it } from 'vitest'

import {
  SuppliersRepositoryMock,
  CompanyRepositoryMock,
} from '../../../../__tests__/mocks/repositories'
import { SuppliersFaker, CompanyFaker } from '../../../../__tests__/fakers'
import { RegisterSupplierUseCase } from '../register-supplier-use-case'
import { Company, Supplier } from '../../../domain/entities'
import { ConflictError } from '../../../errors'

describe('Register supplier use case', () => {
  let supplierRepository = new SuppliersRepositoryMock()
  let companiesRepository = new CompanyRepositoryMock()
  let useCase = new RegisterSupplierUseCase(supplierRepository)

  beforeEach(() => {
    supplierRepository = new SuppliersRepositoryMock()
    companiesRepository = new CompanyRepositoryMock()
    useCase = new RegisterSupplierUseCase(supplierRepository)
  })

  it('Should register a supplier', async () => {
    expect(supplierRepository.suppliers).toHaveLength(0)

    const supplierDto = SuppliersFaker.fakeDto()

    const companyDto = CompanyFaker.fakeDto({ id: supplierDto.companyId })
    const company = Company.create(companyDto)
    await companiesRepository.add(company)

    await useCase.execute({ supplierDto })

    expect(supplierRepository.suppliers).toHaveLength(1)
    expect(supplierRepository.suppliers[0]?.dto).toEqual(supplierDto)
  })

  it('Should not register a supplier with an existing CNPJ in the same company', async () => {
    const existingSupplierDto = SuppliersFaker.fakeDto({
      cnpj: '12.345.678/0001-90',
      companyId: 'company-1',
    })

    const existingSupplier = Supplier.create(existingSupplierDto)
    await supplierRepository.add(existingSupplier)
    expect(supplierRepository.suppliers).toHaveLength(1)

    const supplierDto = SuppliersFaker.fakeDto({
      cnpj: '12.345.678/0001-90',
      companyId: 'company-1',
    })

    const companyDto = CompanyFaker.fakeDto({ id: supplierDto.companyId })
    const company = Company.create(companyDto)
    await companiesRepository.add(company)

    await expect(useCase.execute({ supplierDto })).rejects.toThrowError(
      new ConflictError('Fornecedor já cadastrado nessa empresa')
    )

    expect(supplierRepository.suppliers).toHaveLength(1)
  })

  it('Should register a supplier with an existing CNPJ in a different company', async () => {
    const existingSupplierDto = SuppliersFaker.fakeDto({
      cnpj: '12.345.678/0001-90',
      companyId: 'company-1',
    })

    const existingSupplier = Supplier.create(existingSupplierDto)
    await supplierRepository.add(existingSupplier)
    expect(supplierRepository.suppliers).toHaveLength(1)

    const supplierDto = SuppliersFaker.fakeDto({
      cnpj: '12.345.678/0001-90',
      companyId: 'company-2',
    })

    const companyDto1 = CompanyFaker.fakeDto({ id: existingSupplierDto.companyId })
    const company1 = Company.create(companyDto1)
    await companiesRepository.add(company1)

    const companyDto2 = CompanyFaker.fakeDto({ id: supplierDto.companyId })
    const company2 = Company.create(companyDto2)
    await companiesRepository.add(company2)

    await useCase.execute({ supplierDto })

    expect(supplierRepository.suppliers).toHaveLength(2)
    expect(supplierRepository.suppliers[1]?.dto).toEqual(supplierDto)
  })
})
