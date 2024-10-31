import { describe, expect, it } from 'vitest'

import { UsersRepositoryMock } from '../../../../__tests__/mocks/repositories'
import { UsersFaker } from '../../../../__tests__/fakers'
import { RegisterUserUseCase } from '../register-user-use-case'

describe('Register user use case', () => {
  it('should register a user', async () => {
    const userRepository = new UsersRepositoryMock()
    const useCase = new RegisterUserUseCase(userRepository)

    expect(userRepository.users).toHaveLength(0)

    const userDto = UsersFaker.fakeDto()
    await useCase.execute({ userDto })

    expect(userRepository.users).toHaveLength(1)
    expect(userRepository.users[0]?.dto).toEqual(userDto)
  })
})
