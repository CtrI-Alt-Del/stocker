import type { IHttp } from '@stocker/core/interfaces'
import { RequestPasswordResetUseCase } from '@stocker/core/use-cases'
import { HTTP_STATUS_CODE } from '@stocker/core/constants'

import { cryptoProvider, emailProvider } from '@/providers'
import { ENV } from '@/constants'

type Body = {
  email: string
}

export class RequestPasswordResetController {
  async handle(http: IHttp) {
    const { email } = http.getBody<Body>()
    const useCase = new RequestPasswordResetUseCase(cryptoProvider, emailProvider)
    const confirmationToken = await useCase.execute(email, ENV.passwordResetSecret)

    return http.send({ confirmationToken }, HTTP_STATUS_CODE.created)
  }
}
