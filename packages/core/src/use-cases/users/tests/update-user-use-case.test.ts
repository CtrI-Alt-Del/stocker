import { beforeEach, describe, expect, it } from 'vitest'

import { UsersRepositoryMock } from '../../../../__tests__/mocks/repositories'
import { UsersFaker } from '../../../../__tests__/fakers'
import { UpdateUserUseCase } from '../update-user-use-case'
import { NotFoundError } from '../../../errors'

let useCase: UpdateUserUseCase
let userRepository: UsersRepositoryMock

describe('Update user use case', () => {
  beforeEach(() => {
    userRepository = new UsersRepositoryMock()
    useCase = new UpdateUserUseCase(userRepository)
  })

  it('should not update user if the user does not exist', async () => {
    const fakeUser = UsersFaker.fake()

    expect(async () => {
      await useCase.execute({ userDto: fakeUser.dto, userId: fakeUser.id })
    }).rejects.toThrowError(NotFoundError)
  })

  it('should update user', async () => {
    const fakeUser = UsersFaker.fake({
      name: 'original name',
      password: 'original password',
      companyId: 'original companyId'
    })
    await userRepository.add(fakeUser)

    expect(userRepository.users[0]?.name).toEqual('original name')
    expect(userRepository.users[0]?.password).toEqual('original password')
    expect(userRepository.users[0]?.companyId).toEqual('original companyId')

    await useCase.execute({
      userDto: { name: 'updated name', password: 'updated password' },
      userId: fakeUser.id,
    })

    expect(userRepository.users[0]?.name).toEqual('updated name')
    expect(userRepository.users[0]?.companyId).toEqual('original companyId')
  })
})
