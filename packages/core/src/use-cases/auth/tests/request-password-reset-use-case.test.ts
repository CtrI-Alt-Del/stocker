import { beforeEach, describe, expect, it } from 'vitest'

import { QueueProviderMock } from '../../../../__tests__/mocks/providers'
import { CryptoProviderMock } from '../../../../__tests__/mocks/providers/crypto-provider-mock'
import { RequestPasswordResetUseCase } from '../request-password-reset-use-case'

let cryptoProvider: CryptoProviderMock
let queueProvider: QueueProviderMock
let useCase: RequestPasswordResetUseCase

describe('Request password reset use case', () => {
  beforeEach(() => {
    cryptoProvider = new CryptoProviderMock()
    queueProvider = new QueueProviderMock()
    useCase = new RequestPasswordResetUseCase(cryptoProvider, queueProvider)
  })

  it('should push to the queue a job that sends password reset email', async () => {
    const fakeRecipientEmail = 'fake@gmail.com'

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
})
