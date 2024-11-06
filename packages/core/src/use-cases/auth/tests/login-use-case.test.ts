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

describe('Login use case', () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryMock()
    cryptoProvider = new BcryptCryptoProvider()
    useCase = new LoginUseCase(usersRepository, cryptoProvider)
  })

  it('should log in and return user dto', async () => {
    let fakeUser = UsersFaker.fake()
    const password = fakeUser.password
    const hashedPassword = await cryptoProvider.hash(fakeUser.password)
    fakeUser = fakeUser.update({ password: hashedPassword })
    usersRepository.add(fakeUser)
    expect(usersRepository.users).toHaveLength(1)

    await useCase.execute({ email: fakeUser.email, password })
    expect(fakeUser.dto)
  })

  it('should generate an error if there is no user with the received email', async () => {
    expect(async () => {
      await useCase.execute({ email: '', password: ''})
    }).rejects.toThrowError(NotFoundError)
  })

  it('should generate an error if the credentials are invalid', async () => {
    const fakeUser = UsersFaker.fake()
    usersRepository.add(fakeUser)
    expect(usersRepository.users).toHaveLength(1)

    expect(async () => {
      await useCase.execute({ email: fakeUser.email, password: ''})
    }).rejects.toThrowError('Credenciais inválidas')
  })
})
