import type { IHttp } from '@stocker/core/interfaces'
import { DeleteSuppliersUseCase } from '@stocker/core/use-cases'

import { suppliersRepository } from '@/database'

type Body = {
  suppliersIds: string[]
}

export class DeleteSuppliersController {
  async handle(http: IHttp) {
    const { suppliersIds } = http.getBody<Body>()
    const useCase = new DeleteSuppliersUseCase(suppliersRepository)
    await useCase.execute({
      suppliersIds,
    })
    return http.send(null)
  }
}
