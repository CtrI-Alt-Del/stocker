import { ReportMostTrendingProductsUseCase } from '@stocker/core/use-cases'
import { productsRepository } from '@/database'
import type { IHttp } from '@stocker/core/interfaces'
import { HTTP_STATUS_CODE } from '@stocker/core/constants'

export class MostTrendingProductsController {
  async handle(http: IHttp) {
    const { startDate, endDate } = http.getQueryParams<{
      startDate?: string
      endDate?: string
    }>()
    const useCase = new ReportMostTrendingProductsUseCase(productsRepository)
    const result = await useCase.execute({
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
    })

    return http.send(
      { products: result.products.map((product) => product.dto) },
      HTTP_STATUS_CODE.ok,
    )
  }
}
