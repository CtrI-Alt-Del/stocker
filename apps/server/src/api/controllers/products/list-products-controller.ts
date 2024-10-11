import type { IHttp } from '@stocker/core/interfaces'
import { ListProductsUseCase } from '@stocker/core/use-cases'
import { HTTP_STATUS_CODE } from '@stocker/core/constants'

import { productsRepository } from '@/database'

type RouteParams = {
  page: string
}

export class ListProductsController {
  async handle(http: IHttp) {
    const { page } = http.getQueryParams<RouteParams>()
    const pageNumber = parseInt(page || '1', 10)

    const useCase = new ListProductsUseCase(productsRepository)
    const response = await useCase.execute({ page: pageNumber })

    return http.send(response, HTTP_STATUS_CODE.ok)
  }
}
