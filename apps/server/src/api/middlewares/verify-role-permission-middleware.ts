import type { IController, IHttp } from '@stocker/core/interfaces'
import type { RolePermission } from '@stocker/core/types'
import { User } from '@stocker/core/entities'
import { NotAllowedError } from '@stocker/core/errors'
import { companiesRepository } from '@/database'

export class VerifyRolePermissionMiddleware implements IController {
  private readonly permission: RolePermission

  constructor(permission: RolePermission) {
    this.permission = permission
  }

  async handle(http: IHttp) {
    const user = User.create(await http.getUser())
    const role = await companiesRepository.findRoleById(user.role, user.companyId)

    if (!role || !role.hasPermission(this.permission)) {
      throw new NotAllowedError('Permissão negada para esse usuário')
    }

    return http.pass()
  }
}
