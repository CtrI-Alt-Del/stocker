import type { IHttp } from '@stocker/core/interfaces'
import { HTTP_STATUS_CODE } from '@stocker/core/constants'
import { usersRepository } from '@/database'
import { RegisterUserUseCase } from '@stocker/core/use-cases'
import type { UserDto } from '@stocker/core/dtos'
import { BcryptCryptoProvider } from '@/providers/crypto-provider'


export class RegisterUserController {
  async handle(http: IHttp) {
    const userDto = http.getBody<UserDto>()
    const bcryptProvider = new BcryptCryptoProvider()
    const useCase = new RegisterUserUseCase(usersRepository,bcryptProvider)
    const userId = await useCase.execute({ userDto })
    return http.send({ userId }, HTTP_STATUS_CODE.created)
  }
}
