import type { IHttp } from '@stocker/core/interfaces'
import { DeleteCompanyUseCase, DeleteUsersUseCase } from '@stocker/core/use-cases'
import { HTTP_STATUS_CODE } from '@stocker/core/constants'

import { companiesRepository, usersRepository } from '@/database'
import { User } from '@stocker/core/entities'
import { NotificationsSocket } from '@/realtime/sockets'

export class DeleteAccountController {
  async handle(http: IHttp) {
    const user = User.create(await http.getUser())

    const notificationsSocket = new NotificationsSocket(user.companyId)
    const deleteCompanyUseCase = new DeleteCompanyUseCase(
      companiesRepository,
      notificationsSocket,
    )

    await deleteCompanyUseCase.execute({
      companyId: user.companyId,
    })

    http.destroyJwt()
    return http.send(null, HTTP_STATUS_CODE.ok)
  }
}
