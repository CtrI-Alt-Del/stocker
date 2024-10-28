import type { IHttp } from '@stocker/core/interfaces'
import { DeleteUsersUseCase } from '@stocker/core/use-cases'

import { usersRepository} from '@/database'

type Body = {
  usersIds: string[]
  companyId: string
}

export class DeleteUsersController {
  async handle(http: IHttp) {
    const { usersIds,companyId } = http.getBody<Body>()

    const useCase = new DeleteUsersUseCase(usersRepository)
    await useCase.execute({
      usersIds,
      companyId
    })
    return http.send(null)
  }
}
