import { beforeEach, describe, expect, it } from 'vitest'
import { UsersRepositoryMock } from '../../../../__tests__/mocks/repositories'
import { UsersFaker } from '../../../../__tests__/fakers'
import { ListUsersUseCase } from '../list-users-use-case'
import { PAGINATION } from '../../../constants'
import type { User } from '../../../domain/entities'

let useCase: ListUsersUseCase
let usersRepository: UsersRepositoryMock
let fakeUsers: User[] = []

describe('List users use case', () => {
  beforeEach(async () => {
    usersRepository = new UsersRepositoryMock()
    useCase = new ListUsersUseCase(usersRepository)
    fakeUsers = UsersFaker.fakeMany(20)
    for (const fakeUser of fakeUsers) {
      await usersRepository.add(fakeUser)
    }
  })

  const companyId = ''
  it(`should list ${PAGINATION.itemsPerPage} users per page`, async () => {
    let pagination = await useCase.execute({ page: 1, companyId })
    expect(pagination.items).toHaveLength(PAGINATION.itemsPerPage)

    pagination = await useCase.execute({ page: 2, companyId })
    expect(pagination.items).toHaveLength(PAGINATION.itemsPerPage)
  })

  it('should return the count of users', async () => {
    const pagination = await useCase.execute({ page: 1, companyId })
    expect(pagination.itemsCount).toBe(fakeUsers.length)
  })

  it('should list the users according to the current page', async () => {
    let pagination = await useCase.execute({ page: 1, companyId })

    expect(pagination.items).toEqual(
      fakeUsers.slice(0, 10).map((user) => user.dto),
    )

    pagination = await useCase.execute({ page: 2, companyId })

    expect(pagination.items).toEqual(
      fakeUsers.slice(10, 20).map((user) => user.dto),
    )
  })
})
