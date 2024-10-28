import type { IHttp } from '@stocker/core/interfaces'
import { HTTP_STATUS_CODE } from '@stocker/core/constants'
import { usersRepository } from '@/database'
import { RegisterUserUseCase } from '@stocker/core/use-cases'
import type { UserDto } from '@stocker/core/dtos'


export class RegisterUserController {
  async handle(http: IHttp) {
    const userDto = http.getBody<UserDto>()
    const useCase = new RegisterUserUseCase(usersRepository)
    const userId = await useCase.execute({ userDto })
  console.log("Ola eu registrei um borther")
    return http.send({ userId }, HTTP_STATUS_CODE.created)
  }
}
