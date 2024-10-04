import { ReportMostTrendingProductsUseCase } from '@stocker/core/use-cases'
import { productsRepository } from '@/database'
import type { IHttp } from '@stocker/core/interfaces'
import { HTTP_STATUS_CODE } from '@stocker/core/constants'

type Query = {
  startDate?: string
  endDate?: string
}

export class ReportMostTrendingProductsController {
  async handle(http: IHttp) {
    const { startDate, endDate } = http.getQueryParams<Query>()
    const useCase = new ReportMostTrendingProductsUseCase(productsRepository)

    const products = await useCase.execute({
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
    })

    return http.send(products, HTTP_STATUS_CODE.ok)
  }
}
