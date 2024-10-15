import { HTTP_STATUS_CODE } from '@stocker/core/constants'
import type { IHttp } from '@stocker/core/interfaces'
import { ReportInventorySummaryUseCase } from '@stocker/core/use-cases'

import { batchesRepository, inventoryMovementsRepository } from '@/database'

export class ReportInventorySummaryController {
  async handle(http: IHttp) {
    const usecase = new ReportInventorySummaryUseCase(
      batchesRepository,
      inventoryMovementsRepository,
    )
    const report = await usecase.execute()

    return http.send(report, HTTP_STATUS_CODE.ok)
  }
}
