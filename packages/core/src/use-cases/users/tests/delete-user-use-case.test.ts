import { beforeEach, describe, expect, it } from 'vitest'

import { UsersRepositoryMock } from '../../../../__tests__/mocks/repositories'
import { NotFoundError } from '../../../errors'
import { UsersFaker } from '../../../../__tests__/fakers'
import { DeleteUsersUseCase } from '../delete-user-use-case'

let useCase: DeleteUsersUseCase
let usersRepository: UsersRepositoryMock

describe('Delete user use case', () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryMock()
    useCase = new DeleteUsersUseCase(usersRepository)
  })

  it('should delete many users at once', async () => {
    const fakeUsers = UsersFaker.fakeMany(5)

    for (const fakeUser of fakeUsers) {
      await usersRepository.add(fakeUser)
    }

    expect(usersRepository.users).toHaveLength(5)

    await useCase.execute({
      usersIds: fakeUsers.map((fakeUser) => fakeUser.id),
    })

    expect(usersRepository.users).toHaveLength(0)
  })

  it('should not delete users that do not exist', async () => {
    const fakeUsers = UsersFaker.fakeMany(5)

    for (const fakeUser of fakeUsers) {
      await usersRepository.add(fakeUser)
    }

    expect(async () => {
      await useCase.execute({
        usersIds: [
          ...fakeUsers.map((fakeUser) => fakeUser.id),
          UsersFaker.fake().id,
        ],
      })
    }).rejects.toThrowError(NotFoundError)
  })
})
