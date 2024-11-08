import { ReportAnnualOutboundInventoryMovementsUseCase } from '@stocker/core/use-cases'
import type { IHttp } from '@stocker/core/interfaces'
import { HTTP_STATUS_CODE } from '@stocker/core/constants'
import { inventoryMovementsRepository, productsRepository } from '@/database'
import type { FindByDateRangeParams } from '@stocker/core/types'

export class ReportAnnualInventorymovementsController {
  async handle(http: IHttp) {
    const { productId } = http.getQueryParams<FindByDateRangeParams>()
    const { companyId } = await http.getUser()
    const useCase = new ReportAnnualOutboundInventoryMovementsUseCase(
      inventoryMovementsRepository,
      productsRepository,
    )
    const result = await useCase.execute({
      productId,
      companyId,
    })
    return http.send(result, HTTP_STATUS_CODE.ok)
  }
}
