import type { IHttp } from '@stocker/core/interfaces'
import { HTTP_STATUS_CODE } from '@stocker/core/constants'

import { User } from '@stocker/core/entities'
import { ConfirmAuthUseCase } from '@stocker/core/use-cases'
import { usersRepository } from '@/database'
import { cryptoProvider } from '@/providers'

type Body = {
  password: string
}

export class ConfirmAuthController {
  async handle(http: IHttp) {
    const user = User.create(await http.getUser())
    const { password } = http.getBody<Body>()

    const useCase = new ConfirmAuthUseCase(usersRepository, cryptoProvider)
    const isAuthenticated = await useCase.execute({ email: user.email, password })

    return http.send(isAuthenticated, HTTP_STATUS_CODE.ok)
  }
}
