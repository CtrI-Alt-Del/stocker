import type { IHttp } from '@stocker/core/interfaces'
import { HTTP_STATUS_CODE } from '@stocker/core/constants'
import { userRepository } from '@/database'
import { RegisterUserUseCase } from '@stocker/core/use-cases'
import type { UserDto } from '@stocker/core/dtos'


export class RegisterUserController {
  async handle(http: IHttp) {
    const userDto = http.getBody<UserDto>()
    const useCase = new RegisterUserUseCase(userRepository)
    const userId = await useCase.execute({ userDto })

    return http.send({ userId }, HTTP_STATUS_CODE.created)
  }
}
