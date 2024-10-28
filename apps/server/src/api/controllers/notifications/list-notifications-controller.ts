import type { IHttp } from '@stocker/core/interfaces'
import { ListNotificationsUseCase } from '@stocker/core/use-cases'
import { notificationsRepository } from '@/database'
import { HTTP_STATUS_CODE } from '@stocker/core/constants'

export class ListNotificationsController {
  async handle(http: IHttp) {
    const user = await http.getUser()
    const companyId = user.companyId
    const useCase = new ListNotificationsUseCase(notificationsRepository)
    const notifications = await useCase.execute({ companyId })
    return http.send(notifications, HTTP_STATUS_CODE.ok)
  }
}
