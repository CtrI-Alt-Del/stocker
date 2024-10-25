import type { IHttp } from "@stocker/core/interfaces";
import { DeleteNotificationUseCase } from "@stocker/core/use-cases";
import { notificationsRepository } from "@/database";

type RouteParams = {
  notificationId: string
}

export class DeleteNotificationController {
  async handle(http: IHttp) {
    const { notificationId } = http.getBody<RouteParams>()
    const useCase = new DeleteNotificationUseCase(notificationsRepository)
    await useCase.execute({ notificationId })

    return http.send(null, 204)
  }
}
