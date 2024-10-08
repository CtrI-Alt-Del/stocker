import type { IHttp } from '@stocker/core/interfaces'
import { ReportInventorysUseCase } from '@stocker/core/use-cases'
import { HTTP_STATUS_CODE } from '@stocker/core/constants'

import { productsRepository } from '@/database'

type QueryParams = {
  page?: string
}

export class ReportInventoryController {
  async handle(http: IHttp) {
    const { page } = http.getQueryParams<QueryParams>()
    const useCase = new ReportInventorysUseCase(productsRepository)
    const products = await useCase.execute({ page: page ? Number(page) : 1 })
    return http.send(products, HTTP_STATUS_CODE.ok)
  }
}
