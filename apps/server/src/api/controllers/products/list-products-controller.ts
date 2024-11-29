import type { IHttp } from '@stocker/core/interfaces'
import { ListProductsUseCase } from '@stocker/core/use-cases'
import { HTTP_STATUS_CODE } from '@stocker/core/constants'

import { productsRepository } from '@/database'

type RouteParams = {
  page: string
  name?: string
  locationId?: string
  categoryId?: string
  supplierId?: string
}

export class ListProductsController {
  async handle(http: IHttp) {
    const { companyId } = await http.getUser()
    const { page, name, locationId, categoryId, supplierId } = http.getQueryParams<RouteParams>()
    const pageNumber = parseInt(page || '1')

    const useCase = new ListProductsUseCase(productsRepository)
    const response = await useCase.execute({ page: pageNumber, name: name, locationId: locationId, categoryId: categoryId, supplierId: supplierId, companyId: companyId })

    return http.send(response, HTTP_STATUS_CODE.ok)
  }
}
