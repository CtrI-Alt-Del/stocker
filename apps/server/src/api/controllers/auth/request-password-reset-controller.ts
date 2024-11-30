import type { IHttp } from '@stocker/core/interfaces'
import { RequestPasswordResetUseCase } from '@stocker/core/use-cases'
import { HTTP_STATUS_CODE } from '@stocker/core/constants'

import { cryptoProvider, queueProvider } from '@/providers'
import { usersRepository } from '@/database'

type Body = {
  email: string
}

export class RequestPasswordResetController {
  async handle(http: IHttp) {
    const { email } = http.getBody<Body>()
    const useCase = new RequestPasswordResetUseCase(
      usersRepository,
      cryptoProvider,
      queueProvider,
    )
    const confirmationToken = await useCase.execute(email)

    return http.send({ confirmationToken }, HTTP_STATUS_CODE.created)
  }
}
