import { notificationsRepository } from '@/database'
import { REALTIME_EVENTS } from '@stocker/core/constants'
import type { StockLevelNotificationDto } from '@stocker/core/dtos'
import type { IRoom, IWs } from '@stocker/core/interfaces'
import {
  DeleteNotificationUseCase,
  ListNotificationsUseCase,
} from '@stocker/core/use-cases'

export class NotificationsRoom implements IRoom {
  constructor(private readonly companyId: string) {}

  handle(ws: IWs): void {
    const listNotificationsUseCase = new ListNotificationsUseCase(notificationsRepository)
    const deleteNotificationUseCase = new DeleteNotificationUseCase(
      notificationsRepository,
    )

    ws.on(REALTIME_EVENTS.notificationsRoom.connected, this.companyId, async () => {
      const notifications = await listNotificationsUseCase.execute({
        companyId: this.companyId,
      })

      ws.emit(REALTIME_EVENTS.notificationsRoom.connected, this.companyId, notifications)
    })

    ws.on(
      REALTIME_EVENTS.notificationsRoom.stockLevelNotificationSent,
      this.companyId,
      async (dto: StockLevelNotificationDto) => {
        ws.emit(
          REALTIME_EVENTS.notificationsRoom.stockLevelNotificationSent,
          this.companyId,
          dto,
        )
      },
    )

    ws.on(
      REALTIME_EVENTS.notificationsRoom.notificationDeleted,
      this.companyId,
      async (notificationId: string) => {
        await deleteNotificationUseCase.execute({ notificationId })
        const notifications = await listNotificationsUseCase.execute({
          companyId: this.companyId,
        })

        ws.emit(
          REALTIME_EVENTS.notificationsRoom.connected,
          this.companyId,
          notifications,
        )
      },
    )
  }
}
