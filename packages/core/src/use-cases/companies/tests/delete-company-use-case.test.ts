import { beforeEach, describe, expect, it } from 'vitest'
import { CompanyRepositoryMock } from '../../../../__tests__/mocks/repositories'
import { NotFoundError } from '../../../errors'
import { CompanyFaker } from '../../../../__tests__/fakers'
import { DeleteCompanyUseCase } from '../delete-company-use-case'
import { NotificationsSocketMock } from '../../../../__tests__/mocks/sockets'

let useCase: DeleteCompanyUseCase
let companyRepository: CompanyRepositoryMock
let notificationsSocket: NotificationsSocketMock

describe('Delete company use case', () => {
  beforeEach(() => {
    notificationsSocket = new NotificationsSocketMock()
    companyRepository = new CompanyRepositoryMock()
    useCase = new DeleteCompanyUseCase(companyRepository, notificationsSocket)
  })

  it('should delete a company by its ID', async () => {
    const fakeCompany = CompanyFaker.fake()
    await companyRepository.add(fakeCompany)

    expect(companyRepository.companies).toHaveLength(1)

    await useCase.execute({ companyId: fakeCompany.id })
    expect(companyRepository.companies).toHaveLength(0)
  })

  it('should emit company deleted notification on delete company', async () => {
    const fakeCompany = CompanyFaker.fake()
    await companyRepository.add(fakeCompany)
    
    expect(notificationsSocket.emittedCompanyDeletedNotificationsCount).toBe(0)

    await useCase.execute({ companyId: fakeCompany.id })
    expect(notificationsSocket.emittedCompanyDeletedNotificationsCount).toBe(1)
  })

  it('should throw an error if company does not exist', async () => {
    const fakeCompany = CompanyFaker.fake()

    expect(async () => {
      await useCase.execute({ companyId: fakeCompany.id })
    }).rejects.toThrowError(NotFoundError)
  })
})
