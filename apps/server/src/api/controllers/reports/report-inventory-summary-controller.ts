import { HTTP_STATUS_CODE } from '@stocker/core/constants'
import type { IHttp } from '@stocker/core/interfaces'
import { ReportInventorySummaryUseCase } from '@stocker/core/use-cases'

import { batchesRepository, inventoryMovementsRepository, productsRepository } from '@/database'

export class ReportInventorySummaryController {
  async handle(http: IHttp) {
    const {companyId} = await http.getUser()
    const usecase = new ReportInventorySummaryUseCase(
      batchesRepository,
      inventoryMovementsRepository,
      productsRepository,
    )
    const report = await usecase.execute({companyId})

    return http.send(report, HTTP_STATUS_CODE.ok)
  }
}
