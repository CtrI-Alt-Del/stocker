import type { IHttp } from '@stocker/core/interfaces'
import { ListCategoryUseCase } from '@stocker/core/use-cases'

import { categoriesRepository } from '@/database'
import { HTTP_STATUS_CODE } from '@stocker/core/constants'

type RouteParams = {
  page: string
}

export class ListCategoryController {
  async handle(http: IHttp) {
    const { companyId } = await http.getUser()
    const { page } = http.getQueryParams<RouteParams>()
    const pageNumber = parseInt(page || '1', 10)

    const useCase = new ListCategoryUseCase(categoriesRepository)
    const response = await useCase.execute({ page: pageNumber, companyId: companyId })

    return http.send(response, HTTP_STATUS_CODE.ok)
  }
}
