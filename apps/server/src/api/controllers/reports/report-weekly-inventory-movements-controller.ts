import { HTTP_STATUS_CODE } from '@stocker/core/constants'
import type { IHttp } from '@stocker/core/interfaces'
import { ReportWeeklyInventoryMovementsUseCase } from '@stocker/core/use-cases'

import { inventoryMovementsRepository } from '@/database'

type QueryParams = {
  productId?: string
}

export class ReportWeeklyInventoryMovementsController {
  async handle(http: IHttp) {
    const { productId } = http.getQueryParams<QueryParams>()

    const usecase = new ReportWeeklyInventoryMovementsUseCase(
      inventoryMovementsRepository,
    )
    const stockLevel = await usecase.execute({
      productId,
    })

    return http.send(stockLevel, HTTP_STATUS_CODE.ok)
  }
}
