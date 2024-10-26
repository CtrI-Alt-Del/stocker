import type { UserDto } from '@stocker/core/dtos'
import type { IHttp } from '@stocker/core/interfaces'
import { UpdateUserUseCase } from '@stocker/core/use-cases'

import { usersRepository } from '@/database'

type RouteParams = {
  userId: string
}

export class UpdateUserController {
  async handle(http: IHttp) {
    const { userId } = http.getRouteParams<RouteParams>()
    const useCase = new UpdateUserUseCase(usersRepository)
    const userDto = http.getBody<Partial<UserDto>>()
    await useCase.execute({ userId, userDto })

    return http.send({ userId })
  }
}
