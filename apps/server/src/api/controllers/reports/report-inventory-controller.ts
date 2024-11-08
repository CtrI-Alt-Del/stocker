import type { IHttp } from '@stocker/core/interfaces'
import { ReportInventorysUseCase } from '@stocker/core/use-cases'
import { HTTP_STATUS_CODE } from '@stocker/core/constants'

import { productsRepository } from '@/database'

type QueryParams = {
  page?: string
}

export class ReportInventoryController {
  async handle(http: IHttp) {
    const { companyId } = await http.getUser()
    const { page } = http.getQueryParams<QueryParams>()
    const pageNumber = parseInt(page || '1', 10)
    const useCase = new ReportInventorysUseCase(productsRepository)
    const products = await useCase.execute({ page: pageNumber,companyId: companyId })
    return http.send(products, HTTP_STATUS_CODE.ok)
  }
}
