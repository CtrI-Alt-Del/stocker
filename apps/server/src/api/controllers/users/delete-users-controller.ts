import type { IHttp } from '@stocker/core/interfaces'
import { DeleteUsersUseCase } from '@stocker/core/use-cases'

import { usersRepository } from '@/database'

type Body = {
  usersIds: string[]
}

export class DeleteUsersController {
  async handle(http: IHttp) {
    const { usersIds } = http.getBody<Body>()
    const useCase = new DeleteUsersUseCase(usersRepository)
    await useCase.execute({
      usersIds,
    })
    return http.send(null)
  }
}
