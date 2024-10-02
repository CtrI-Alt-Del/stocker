import { productsRepository } from '@/database'
import { HTTP_STATUS_CODE } from '@stocker/core/constants'
import type { IHttp } from '@stocker/core/interfaces'
import { ReportStockLevelUseCase } from '@stocker/core/use-cases'

export class ReportStockLevelController {
  async handle(http: IHttp) {
    const usecase = new ReportStockLevelUseCase(productsRepository)
    const stockLevel = await usecase.execute()

    return http.send(stockLevel, HTTP_STATUS_CODE.ok)
  }
}
