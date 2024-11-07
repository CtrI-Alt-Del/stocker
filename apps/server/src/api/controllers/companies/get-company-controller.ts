import type { IHttp } from '@stocker/core/interfaces'
import {
  DeleteCompanyUseCase,
  GetCategoryUseCase,
  GetCompanyUseCase,
} from '@stocker/core/use-cases'
import { HTTP_STATUS_CODE } from '@stocker/core/constants'

import { companiesRepository } from '@/database'

type RouteParams = {
  companyId: string
}

export class GetCompanyController {
  async handle(http: IHttp) {
    const { companyId } = http.getRouteParams<RouteParams>()
    const useCase = new GetCompanyUseCase(companiesRepository)
    const company = await useCase.execute({ companyId })
    return http.send(company, HTTP_STATUS_CODE.ok)
  }
}
