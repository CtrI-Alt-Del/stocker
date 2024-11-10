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
    const companyIdFake = 'company-id-fake'
    
    const managers = UsersFaker.fakeMany(3, { role: 'manager', companyId })
    const managersFake = UsersFaker.fakeMany(1, { role: 'manager', companyId: companyIdFake })
    
    const employees = UsersFaker.fakeMany(5, { role: 'employee', companyId })
    const employeesFake = UsersFaker.fakeMany(3, { role: 'employee', companyId: companyIdFake })

    for (const user of [...managers, ...employees, ...managersFake, ...employeesFake]) {
      await usersRepository.add(user)
    }

    expect(usersRepository.users).toHaveLength(12)

    const result = await useCase.execute({ companyId })

    expect(result.managersCount).toBe(3)
    expect(result.employeesCount).toBe(5)
  })

  it('should return zero for managers and employees if no users are in company', async () => {
    const companyId = 'non-existent-company-id'

    const result = await useCase.execute({ companyId })

    expect(result.managersCount).toBe(0)
    expect(result.employeesCount).toBe(0)
  })
})
