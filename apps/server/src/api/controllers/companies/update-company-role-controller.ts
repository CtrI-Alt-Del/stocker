import type { IHttp } from '@stocker/core/interfaces'
import { UpdateCompanyRoleUseCase } from '@stocker/core/use-cases'
import { HTTP_STATUS_CODE } from '@stocker/core/constants'

import { companiesRepository } from '@/database'

type RouteParams = {
  companyId: string
}

type Body = {
  name: string
  permissions: string[]
}

export class UpdateCompanyRoleController {
  async handle(http: IHttp) {
    const { companyId } = http.getRouteParams<RouteParams>()
    const { name, permissions } = http.getBody<Body>()
    const useCase = new UpdateCompanyRoleUseCase(companiesRepository)
    await useCase.execute({ companyId, name, permissions })
    return http.send(null, HTTP_STATUS_CODE.ok)
  }
}
