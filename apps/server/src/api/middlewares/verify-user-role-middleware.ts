import type { IController, IHttp } from '@stocker/core/interfaces'
import type { UserRole } from '@stocker/core/types'
import { User } from '@stocker/core/entities'
import { NotAllowedError } from '@stocker/core/errors'

export class VerifyUserRoleMiddleware implements IController {
  private readonly role: UserRole

  constructor(role: UserRole) {
    this.role = role
  }

  async handle(http: IHttp) {
    const user = User.create(await http.getUser())

    if (!user.hasValidRole(this.role)) {
      throw new NotAllowedError('Permissão negada para esse usuário')
    }

    return http.pass()
  }
}
