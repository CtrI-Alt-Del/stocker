import { usersRepository } from '@/database'
import { cryptoProvider } from '@/providers'
import type { IHttp } from '@stocker/core/interfaces'
import { ResetPasswordUseCase } from '@stocker/core/use-cases'
import { HTTP_STATUS_CODE } from '@stocker/core/constants'

type Body = {
  email: string
  password: string
}
export class ResetPasswordController {
  async handle(http: IHttp) {
    const { email, password } = http.getBody<Body>()
    const useCase = new ResetPasswordUseCase(usersRepository, cryptoProvider)
    const userDto = await useCase.execute({ email, password })
    const jwt = await http.setJwt(userDto)
    return http.send({ jwt }, HTTP_STATUS_CODE.ok)
  }
}
