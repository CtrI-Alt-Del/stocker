import type { IHttp } from '@stocker/core/interfaces'
import { CountCompanyUsersUseCase } from '@stocker/core/use-cases'
import { HTTP_STATUS_CODE } from '@stocker/core/constants'

import { usersRepository } from '@/database'

export class CountCompanyUsersController {
  async handle(http: IHttp) {
    const { companyId } = await http.getUser()
    const useCase = new CountCompanyUsersUseCase(usersRepository)
    const response = await useCase.execute({ companyId })
    return http.send(response, HTTP_STATUS_CODE.ok)
  }
}
