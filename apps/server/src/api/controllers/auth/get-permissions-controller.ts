import type { IHttp } from '@stocker/core/interfaces'
import { HTTP_STATUS_CODE } from '@stocker/core/constants'

import { companiesRepository } from '@/database'
import { User } from '@stocker/core/entities'

export class GetPermissionsController {
  async handle(http: IHttp) {
    const user = User.create(await http.getUser())
    const role = await companiesRepository.findRoleById(user.role, user.companyId)
    return http.send(role?.permissions, HTTP_STATUS_CODE.ok)
  }
}
