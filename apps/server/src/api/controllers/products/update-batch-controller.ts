import type { BatchDto } from '@stocker/core/dtos'
import type { IHttp } from '@stocker/core/interfaces'
import { UpdateBatchUseCase } from '@stocker/core/use-cases'

import { batchesRepository } from '@/database'

type RouteParams = {
  batchId: string
}

export class UpdateBatchController {
  async handle(http: IHttp) {
    const { batchId } = http.getRouteParams<RouteParams>()
    const useCase = new UpdateBatchUseCase(batchesRepository)
    const batchDto = http.getBody<Partial<BatchDto>>()
    await useCase.execute({ batchId, batchDto })

    return http.send({ batchId })
  }
}
