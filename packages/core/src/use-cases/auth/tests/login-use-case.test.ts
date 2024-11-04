import { beforeEach, describe, expect, it } from 'vitest'
import { UsersRepositoryMock } from '../../../../__tests__/mocks/repositories'
import { NotFoundError } from '../../../errors'
import { UsersFaker } from '../../../../__tests__/fakers'
import { LoginUseCase } from '../login-use-case'
import { BcryptCryptoProvider } from '../../../../../../apps/server/src/providers/crypto-provider'
import type { ICryptoProvider } from '../../../interfaces'

let useCase: LoginUseCase
let usersRepository: UsersRepositoryMock
let cryptoProvider: ICryptoProvider

describe('Delete company use case', () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryMock()
    cryptoProvider = new BcryptCryptoProvider()
    useCase = new LoginUseCase(usersRepository, cryptoProvider)
  })

  it('should log in and return user dto', async () => {
    const fakeUser = UsersFaker.fake()

    await usersRepository.add(fakeUser)

    expect(usersRepository.users).toHaveLength(1)

    const result = await useCase.execute({ email: fakeUser.email, password: fakeUser.password })

    expect(result).toBe(fakeUser.password)
  })
})
