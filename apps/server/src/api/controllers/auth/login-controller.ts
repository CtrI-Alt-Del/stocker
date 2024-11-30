import type { IHttp } from '@stocker/core/interfaces'
import { LoginUseCase } from '@stocker/core/use-cases'
import { HTTP_STATUS_CODE } from '@stocker/core/constants'

import { usersRepository } from '@/database'
import { cryptoProvider } from '@/providers'
import { COOKIES } from '@/constants'
import { AuthSocket } from '@/realtime/sockets'

type Body = {
  email: string
  password: string
}

export class LoginController {
  async handle(http: IHttp) {
    const { email, password } = http.getBody<Body>()

    const useCase = new LoginUseCase(usersRepository, cryptoProvider)
    const userDto = await useCase.execute({ email, password })
    const authSocket = new AuthSocket('6ecaec32-4802-48b9-9548-215daf50359f')

    const jwt = await http.setJwt(userDto)
    http.setCookie(COOKIES.jwt.key, jwt, COOKIES.jwt.duration)

    setTimeout(() => authSocket.emitAccountLogged(), 1000)

    return http.send({ jwt }, HTTP_STATUS_CODE.ok)
  }
}
