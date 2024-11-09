import { notificationsRepository } from '@/database'
import { REALTIME_EVENTS } from '@stocker/core/constants'
import type { StockLevelNotificationDto } from '@stocker/core/dtos'
import type { IChannel, IWs } from '@stocker/core/interfaces'
import {
  DeleteNotificationUseCase,
  ListNotificationsUseCase,
} from '@stocker/core/use-cases'

export class NotificationsChannel implements IChannel {
  constructor(private readonly companyId: string) {}

  handle(ws: IWs): void {
    const listNotificationsUseCase = new ListNotificationsUseCase(notificationsRepository)
    const deleteNotificationUseCase = new DeleteNotificationUseCase(
      notificationsRepository,
    )

    ws.on(REALTIME_EVENTS.notificationsChannel.connected, async () => {
      const notifications = await listNotificationsUseCase.execute(this.companyId)

      ws.broadcast(REALTIME_EVENTS.notificationsChannel.connected, notifications)
    })

    ws.on(
      REALTIME_EVENTS.notificationsChannel.stockLevelNotificationSent,
      async (dto: StockLevelNotificationDto) => {
        ws.broadcast(REALTIME_EVENTS.notificationsChannel.stockLevelNotificationSent, dto)
      },
    )

    ws.on(
      REALTIME_EVENTS.notificationsChannel.notificationDeleted,
      async (notificationId: string) => {
        await deleteNotificationUseCase.execute({ notificationId })
        const notifications = await listNotificationsUseCase.execute(this.companyId)

        ws.broadcast(REALTIME_EVENTS.notificationsChannel.connected, notifications)
      },
    )
  }
}
