import { HTTP_STATUS_CODE } from '@stocker/core/constants'
import type { IHttp } from '@stocker/core/interfaces'
import { ReportInventorysUseCase } from '@stocker/core/use-cases'

import { productsRepository } from '@/database'
import type { StockLevel } from '@stocker/core/types'

type QueryParams = {
  productName?: string
  locationId?: string
  categoryId?: string
  stockLevel?: StockLevel
  supplierId?: string
  page: string
}

export class ReportInventoryController {
  async handle(http: IHttp) {
    const { companyId } = await http.getUser()
    const { page, productName, locationId, categoryId, stockLevel, supplierId } =
      http.getQueryParams<QueryParams>()
    const pageNumber = parseInt(page || '1', 10)
    const useCase = new ReportInventorysUseCase(productsRepository)
    const products = await useCase.execute({
      page: pageNumber,
      productName,
      locationId,
      categoryId,
      stockLevel,
      supplierId,
      companyId,
    })
    return http.send(products, HTTP_STATUS_CODE.ok)
  }
}
