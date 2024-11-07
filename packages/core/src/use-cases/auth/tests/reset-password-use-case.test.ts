import { beforeEach, describe, expect, it } from 'vitest'
import { UsersRepositoryMock } from '../../../../__tests__/mocks/repositories'
import { NotFoundError } from '../../../errors'
import { UsersFaker } from '../../../../__tests__/fakers'
import { ResetPasswordUseCase } from '../reset-password-use-case'
import { BcryptCryptoProvider } from '../../../../../../apps/server/src/providers/crypto-provider'
import type { ICryptoProvider } from '../../../interfaces'

let useCase: ResetPasswordUseCase
let usersRepository: UsersRepositoryMock
let cryptoProvider: ICryptoProvider

describe('Reset Password use case', () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryMock()
    cryptoProvider = new BcryptCryptoProvider()
    useCase = new ResetPasswordUseCase(usersRepository, cryptoProvider)
  })

  it('should reset the user password', async () => {
    const fakeUser = UsersFaker.fake()
    usersRepository.add(fakeUser)
    expect(usersRepository.users).toHaveLength(1)

    await useCase.execute({ email: fakeUser.email, password: 'bananinha' })
    const user = await usersRepository.findByEmail(fakeUser.email)
    expect(user?.password !== fakeUser.password)
  })

  it('should generate an error if there is no user with the received email', async () => {
    expect(async () => {
      await useCase.execute({ email: '', password: '' })
    }).rejects.toThrowError(NotFoundError)
  })
})
