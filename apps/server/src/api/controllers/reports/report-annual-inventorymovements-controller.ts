import { ReportAnnualOutboundInventoryMovementsUseCase } from '@stocker/core/use-cases'
import type { IHttp } from '@stocker/core/interfaces'
import { HTTP_STATUS_CODE } from '@stocker/core/constants'
import { inventoryMovementsRepository } from '@/database'
import type { FindByDateRangeParams } from '@stocker/core/types'

export class ReportAnnualInventorymovementsController {
  async handle(http: IHttp) {
    const queryParams = http.getQueryParams<FindByDateRangeParams>()

    const useCase = new ReportAnnualOutboundInventoryMovementsUseCase(
      inventoryMovementsRepository,
    )
    const result = await useCase.execute({
      productId: queryParams.productId,
    })
    return http.send(result, HTTP_STATUS_CODE.ok)
  }
}
