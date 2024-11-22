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

  it('Should not register a supplier with an existing email', async () => {
    const existingSupplierDto = SuppliersFaker.fakeDto({
      email: 'existing-email@example.com',
    })

    const existingSupplier = Supplier.create(existingSupplierDto)
    await supplierRepository.add(existingSupplier) 
    expect(supplierRepository.suppliers).toHaveLength(1)

    const supplierDto = SuppliersFaker.fakeDto({
      email: 'existing-email@example.com',
    })

    const companyDto = CompanyFaker.fakeDto({ id: supplierDto.companyId })
    const company = Company.create(companyDto)
    await companiesRepository.add(company)

    await expect(useCase.execute({ supplierDto })).rejects.toThrowError(
      new ConflictError('Email já em uso')
    )

    expect(supplierRepository.suppliers).toHaveLength(1)
  })

  it('Should not register a supplier with an existing CNPJ', async () => {
    const existingSupplierDto = SuppliersFaker.fakeDto({
      cnpj: '12.345.678/0001-90',
    })

    const existingSupplier = Supplier.create(existingSupplierDto)
    await supplierRepository.add(existingSupplier) 
    expect(supplierRepository.suppliers).toHaveLength(1)

    const supplierDto = SuppliersFaker.fakeDto({
      cnpj: '12.345.678/0001-90',
    })

    const companyDto = CompanyFaker.fakeDto({ id: supplierDto.companyId })
    const company = Company.create(companyDto)
    await companiesRepository.add(company)

    await expect(useCase.execute({ supplierDto })).rejects.toThrowError(
      new ConflictError('CNPJ já em uso')
    )

    expect(supplierRepository.suppliers).toHaveLength(1)
  })

  it('Should not register a supplier with an existing phone', async () => {
    const existingSupplierDto = SuppliersFaker.fakeDto({
      cnpj: '1',
      phone: '984567789',
    })

    const existingSupplier = Supplier.create(existingSupplierDto)
    await supplierRepository.add(existingSupplier) 
    expect(supplierRepository.suppliers).toHaveLength(1)

    const supplierDto = SuppliersFaker.fakeDto({
      phone: '984567789',
    })

    const companyDto = CompanyFaker.fakeDto({ id: supplierDto.companyId })
    const company = Company.create(companyDto)
    await companiesRepository.add(company)

    await expect(useCase.execute({ supplierDto })).rejects.toThrowError(
      new ConflictError('Telefone já em uso')
    )

    expect(supplierRepository.suppliers).toHaveLength(1)
  })
})
