import { ReportMostTrendingProductsUseCase } from '@stocker/core/use-cases'
import { productsRepository } from '@/database'
import type { IHttp } from '@stocker/core/interfaces'
import { HTTP_STATUS_CODE } from '@stocker/core/constants'

type Query = {
  startDate?: string
  endDate?: string
  page?: string
}

export class ReportMostTrendingProductsController {
  async handle(http: IHttp) {
    const { startDate, endDate, page } = http.getQueryParams<Query>()
    const useCase = new ReportMostTrendingProductsUseCase(productsRepository)

    const response = await useCase.execute({
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      page: page ? Number(page) : 1,
    })

    return http.send(response, HTTP_STATUS_CODE.ok)
  }
}
