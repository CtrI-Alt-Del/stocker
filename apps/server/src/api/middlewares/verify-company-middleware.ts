import type { IHttp } from '@stocker/core/interfaces'

import { companiesRepository } from '@/database'
import { NotFoundError } from '@stocker/core/errors'

type RouteParams = {
  companyId: string
}

export class VerifyCompanyMiddleware {
  async handle(http: IHttp) {
    const { companyId } = http.getRouteParams<RouteParams>()

    const company = await companiesRepository.findById(companyId)

    if (!company) {
      throw new NotFoundError('Empresa não encontrada')
    }

    http.pass()
  }
}
