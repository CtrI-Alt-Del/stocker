import { describe, expect, it } from 'vitest'

import {
  SuppliersRepositoryMock,
  CompanyRepositoryMock,
} from '../../../../__tests__/mocks/repositories'
import { SuppliersFaker, CompanyFaker } from '../../../../__tests__/fakers'
import { RegisterSupplierUseCase } from '../register-supplier-use-case'
import { Company } from '../../../domain/entities'

describe('Register supplier use case', () => {
  it('should register a supplier', async () => {
    const supplierRepository = new SuppliersRepositoryMock()
    const companiesRepository = new CompanyRepositoryMock()

    const useCase = new RegisterSupplierUseCase(supplierRepository)

    expect(supplierRepository.suppliers).toHaveLength(0)

    const supplierDto = SuppliersFaker.fakeDto()

    const companyDto = CompanyFaker.fakeDto({ id: supplierDto.companyId })
    const company = Company.create(companyDto)
    await companiesRepository.add(company)

    await useCase.execute({ supplierDto })

    expect(supplierRepository.suppliers).toHaveLength(1)
    expect(supplierRepository.suppliers[0]?.dto).toEqual(supplierDto)
  })
})
