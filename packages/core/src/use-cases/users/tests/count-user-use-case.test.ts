import { beforeEach, describe, expect, it } from 'vitest'

import { UsersRepositoryMock } from '../../../../__tests__/mocks/repositories'
import { UsersFaker } from '../../../../__tests__/fakers'
import { CountCompanyUsersUseCase } from '../count-users-use-case'

let useCase: CountCompanyUsersUseCase
let usersRepository: UsersRepositoryMock

describe('Count users use case', () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryMock()
    useCase = new CountCompanyUsersUseCase(usersRepository)
  })

  it('should count managers and employees in a company', async () => {
    const companyId = 'company-id-123'
    const managers = UsersFaker.fakeMany(3, { role: 'manager', companyId })
    const employees = UsersFaker.fakeMany(5, { role: 'employee', companyId })

    for (const user of [...managers, ...employees]) {
      await usersRepository.add(user)
    }

    expect(usersRepository.users).toHaveLength(8)

    const result = await useCase.execute({ companyId })

    expect(result.usersManagers).toBe(3)
    expect(result.usersEmployees).toBe(5)
  })

  // it('should return zero for managers and employees if no users are in company', async () => {
  //   const companyId = 'non-existent-company-id'

  //   usersRepository.countManagerUsersByCompany = jest.fn(async () => 0)
  //   usersRepository.countEmployeeUsersByCompany = jest.fn(async () => 0)

  //   const result = await useCase.execute({ companyId })

  //   expect(result.usersManagers).toBe(0)
  //   expect(result.usersEmployees).toBe(0)
  // })
})
