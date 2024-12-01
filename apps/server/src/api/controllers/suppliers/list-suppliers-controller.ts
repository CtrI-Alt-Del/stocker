import type { IHttp } from '@stocker/core/interfaces'
import { ListSuplliersUseCase } from '@stocker/core/use-cases'
import { HTTP_STATUS_CODE } from '@stocker/core/constants'

import { suppliersRepository } from '@/database'

type RouteParams = {
  page: string
  name?: string
}

export class ListSuppliersController {
  async handle(http: IHttp) {
    const { companyId } = await http.getUser()
    const { page, name } = http.getQueryParams<RouteParams>()
    const pageNumber = parseInt(page || '1', 10)

    console.log({ name })

    const useCase = new ListSuplliersUseCase(suppliersRepository)
    const response = await useCase.execute({
      page: pageNumber,
      name: name,
      companyId: companyId,
    })

    return http.send(response, HTTP_STATUS_CODE.ok)
  }
}
