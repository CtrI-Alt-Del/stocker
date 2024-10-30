import type { IHttp } from '@stocker/core/interfaces'
import { ListUsersUseCase } from '@stocker/core/use-cases'
import { HTTP_STATUS_CODE } from '@stocker/core/constants'

import { usersRepository } from '@/database'

type RouteParams = {
  page: string
  companyId: string
}

export class ListUsersController {
  async handle(http: IHttp) {
    const { page } = http.getQueryParams<RouteParams>()
    const companyId = "eceda392-06df-4ed2-8c90-db6bf1e38830"
    if (!companyId) {
      return http.send(null, HTTP_STATUS_CODE.badRequest)
    }
    const pageNumber = parseInt(page || '1', 10)

    const useCase = new ListUsersUseCase(usersRepository)
    const response = await useCase.execute({ page: pageNumber, companyId: companyId })

    return http.send(response, HTTP_STATUS_CODE.ok)
  }
}
