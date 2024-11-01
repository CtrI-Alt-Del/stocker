import type { IHttp } from '@stocker/core/interfaces'
import { DeleteCompanyUseCase } from '@stocker/core/use-cases'
import { HTTP_STATUS_CODE } from '@stocker/core/constants'

import { companiesRepository } from '@/database'

export class DeleteAccountController {
  async handle(http: IHttp) {
    const { companyId } = await http.getUser()
    const useCase = new DeleteCompanyUseCase(companiesRepository)
    await useCase.execute({
      companyId,
    })

    http.destroyJwt()
    return http.send(null, HTTP_STATUS_CODE.ok)
  }
}
