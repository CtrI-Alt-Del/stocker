import type { IHttp } from '@stocker/core/interfaces'
import { DeleteSuppliersUseCase } from '@stocker/core/use-cases'

import { suppliersRepository } from '@/database'

type Body = {
  suppliersId: string[]
}

export class DeleteSuppliersController {
  async handle(http: IHttp) {
    const { suppliersId } = http.getBody<Body>()
    const useCase = new DeleteSuppliersUseCase(suppliersRepository)
    await useCase.execute({
      suppliersId,
    })
    return http.send(null)
  }
}
