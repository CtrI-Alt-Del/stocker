import { beforeEach, describe, expect, it } from 'vitest'
import { CompanyRepositoryMock } from '../../../../__tests__/mocks/repositories'
import { NotFoundError } from '../../../errors'
import { CompanyFaker } from '../../../../__tests__/fakers'
import { DeleteCompanyUseCase } from '../delete-company-use-case'

let useCase: DeleteCompanyUseCase
let companyRepository: CompanyRepositoryMock

describe('Delete company use case', () => {
  beforeEach(() => {
    companyRepository = new CompanyRepositoryMock()
    useCase = new DeleteCompanyUseCase(companyRepository)
  })

  it('should delete a company by its ID', async () => {
    const fakeCompany = CompanyFaker.fake()

    await companyRepository.add(fakeCompany)

    expect(companyRepository.companies).toHaveLength(1)

    await useCase.execute({ companyId: fakeCompany.id })

    expect(companyRepository.companies).toHaveLength(0)
  })

  it('should throw an error if company does not exist', async () => {
    const fakeCompany = CompanyFaker.fake()

    expect(async () => {
      await useCase.execute({ companyId: fakeCompany.id })
    }).rejects.toThrowError(NotFoundError)
  })
})
