import { beforeEach, describe, expect, it } from 'vitest'

import { QueueProviderMock } from '../../../../__tests__/mocks/providers'
import { CryptoProviderMock } from '../../../../__tests__/mocks/providers/crypto-provider-mock'
import { RequestPasswordResetUseCase } from '../request-password-reset-use-case'
import { UsersRepositoryMock } from '../../../../__tests__/mocks/repositories'
import { UsersFaker } from '../../../../__tests__/fakers'

let usersRepository: UsersRepositoryMock
let cryptoProvider: CryptoProviderMock
let queueProvider: QueueProviderMock
let useCase: RequestPasswordResetUseCase

describe('Request password reset use case', () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryMock()
    cryptoProvider = new CryptoProviderMock()
    queueProvider = new QueueProviderMock()
    useCase = new RequestPasswordResetUseCase(usersRepository, cryptoProvider, queueProvider)
  })

  it('should push to the queue a job that sends password reset email', async () => {
    const fakeRecipientEmail = 'fake@gmail.com'
   await usersRepository.add(UsersFaker.fake({email: fakeRecipientEmail}))
    expect(queueProvider.jobs).toHaveLength(0)

    const confirmationToken = await useCase.execute(fakeRecipientEmail)

    expect(queueProvider.jobs).toHaveLength(1)
    expect(queueProvider.jobs).toEqual([
      {
        key: 'send-password-reset-email',
        data: {
          recipientEmail: fakeRecipientEmail,
          confirmationToken,
        },
      },
    ])
  })

  it('should not push a job to the queue when the recipient user does not exist', async () => {
    const fakeRecipientEmail = 'fake@gmail.com'
    expect(queueProvider.jobs).toHaveLength(0)

    await useCase.execute(fakeRecipientEmail)
    expect(queueProvider.jobs).toHaveLength(0)
   
  })
})
