import type { IHttp } from '@stocker/core/interfaces'
import { DeleteBatchesUseCase } from '@stocker/core/use-cases'

import { batchesRepository } from '@/database'

type Body = {
  batchesIds: string[]
}

export class DeleteBatchesController {
  async handle(http: IHttp) {
    const { batchesIds } = http.getBody<Body>()

    const useCase = new DeleteBatchesUseCase(batchesRepository)
    await useCase.execute({
      batchesIds,
    })
    return http.send(null)
  }
}
