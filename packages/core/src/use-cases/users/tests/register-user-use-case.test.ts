import { describe, expect, it } from 'vitest'

import {
  UsersRepositoryMock,
  CompanyRepositoryMock,
} from '../../../../__tests__/mocks/repositories'
import { UsersFaker, CompanyFaker } from '../../../../__tests__/fakers'
import { RegisterUserUseCase } from '../register-user-use-case'
import { CryptoProvider } from '../../../../../../apps/server/src/providers/crypto-provider'
import { QueueProvider } from '../../../../../../apps/server/src/providers/queue-provider'
import { Company } from '../../../domain/entities'

describe('Register user use case', () => {
  it('should register a user', async () => {
    const userRepository = new UsersRepositoryMock()
    const companiesRepository = new CompanyRepositoryMock()
    const cryptoProvider = new CryptoProvider()
    const queueProvider = new QueueProvider({ jobs: [] })

    const useCase = new RegisterUserUseCase(
      userRepository,
      companiesRepository,
      cryptoProvider,
      queueProvider,
    )

    expect(userRepository.users).toHaveLength(0)

    const userDto = UsersFaker.fakeDto()

    const companyDto = CompanyFaker.fakeDto({ id: userDto.companyId })
    const company = Company.create(companyDto)
    await companiesRepository.add(company)

    await useCase.execute({ userDto })

    expect(userRepository.users).toHaveLength(1)
    expect(userRepository.users[0]?.dto).toEqual(userDto)
  })
})
