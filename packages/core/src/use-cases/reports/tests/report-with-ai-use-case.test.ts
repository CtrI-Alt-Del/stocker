import { beforeEach, describe, expect, it, vi } from 'vitest'
import { CompanyFaker, UsersFaker } from '../../../../__tests__/fakers'
import {
  InventoryMovementsRepositoryMock,
  UsersRepositoryMock,
  CompanyRepositoryMock,
} from '../../../../__tests__/mocks/repositories'
import { AiProviderMock } from '../../../../__tests__/mocks/providers'
import { NotAllowedError, NotFoundError } from '../../../errors'
import { ReportInventoryWithAiUseCase } from '../report-inventory-with-ai-use-case'
import { Role } from '../../../domain/structs'

let useCase: ReportInventoryWithAiUseCase
let inventoryMovementsRepositoryMock: InventoryMovementsRepositoryMock
let usersRepositoryMock: UsersRepositoryMock
let companiesRepositoryMock: CompanyRepositoryMock
let aiProviderMock: AiProviderMock

describe('Report with ai use case', () => {
  beforeEach(() => {
    inventoryMovementsRepositoryMock = new InventoryMovementsRepositoryMock()
    usersRepositoryMock = new UsersRepositoryMock()
    companiesRepositoryMock = new CompanyRepositoryMock()
    aiProviderMock = new AiProviderMock()

    useCase = new ReportInventoryWithAiUseCase(
      inventoryMovementsRepositoryMock,
      usersRepositoryMock,
      companiesRepositoryMock,
      aiProviderMock,
    )
  })

  it('should not report if user that is requesting the report does exist', async () => {
    expect(async () => {
      await useCase.execute({ userId: 'fake user id', onGenerateChunck: vi.fn() })
    }).rejects.toThrowError(NotFoundError)
  })

  it('should not report if user that is requesting the report does not have permission', async () => {
    const fakeUser = UsersFaker.fake()
    usersRepositoryMock.add(fakeUser)

    expect(async () => {
      await useCase.execute({ userId: fakeUser.id, onGenerateChunck: vi.fn() })
    }).rejects.toThrowError(NotAllowedError)
  })

  it('should call a callback on generate chunk', async () => {
    const fakeCompany = CompanyFaker.fake()
    companiesRepositoryMock.add(fakeCompany)

    const fakeUser = UsersFaker.fake({ companyId: fakeCompany.id })
    companiesRepositoryMock.addRole(
      Role.create(fakeUser.role, ['reports']),
      fakeCompany.id,
    )
    usersRepositoryMock.add(fakeUser)

    const onGenerateChunckMock = vi.fn()

    await useCase.execute({ userId: fakeUser.id, onGenerateChunck: onGenerateChunckMock })

    expect(onGenerateChunckMock).toHaveBeenCalledTimes(1)
  })
})
