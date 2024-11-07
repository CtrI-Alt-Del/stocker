import type { IHttp } from '@stocker/core/interfaces'
import { HTTP_STATUS_CODE } from '@stocker/core/constants'
import { RegisterUserUseCase } from '@stocker/core/use-cases'
import type { UserDto } from '@stocker/core/dtos'

import { cryptoProvider, queueProvider } from '@/providers'

import { companiesRepository, usersRepository } from '@/database'

export class RegisterUserController {
  async handle(http: IHttp) {
    const userDto = http.getBody<UserDto>()
    const useCase = new RegisterUserUseCase(
      usersRepository,
      companiesRepository,
      cryptoProvider,
      queueProvider,
    )
    const userId = await useCase.execute({ userDto })
    return http.send({ userId }, HTTP_STATUS_CODE.created)
  }
}
