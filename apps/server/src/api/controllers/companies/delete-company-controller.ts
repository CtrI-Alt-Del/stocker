import type { IHttp } from '@stocker/core/interfaces'
import { DeleteCompanyUseCase } from '@stocker/core/use-cases'
import { HTTP_STATUS_CODE } from '@stocker/core/constants'

import { companiesRepository } from '@/database'

type RouteParams = {
  companyId: string
}

export class DeleteCompanyController {
  async handle(http: IHttp) {
    const { companyId } = http.getRouteParams<RouteParams>()
    const useCase = new DeleteCompanyUseCase(companiesRepository)
    await useCase.execute({
      companyId,
    })
    return http.send(null, HTTP_STATUS_CODE.ok)
  }
}
