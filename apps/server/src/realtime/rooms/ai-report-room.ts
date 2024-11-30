import {
  inventoryMovementsRepository,
  productsRepository,
  usersRepository,
} from '@/database'
import { aiProvider } from '@/providers'
import { REALTIME_EVENTS } from '@stocker/core/constants'
import type { IRoom, IWs } from '@stocker/core/interfaces'
import { ReportInventoryWithAiUseCase } from '@stocker/core/use-cases'

export class AiReportRoom implements IRoom {
  constructor(private readonly userId: string) {}
  handle(ws: IWs): void {
    ws.on(REALTIME_EVENTS.aiReportRoom.connected, this.userId, async () => {
      const useCase = new ReportInventoryWithAiUseCase(
        inventoryMovementsRepository,
        productsRepository,
        usersRepository,
        aiProvider,
      )
      await useCase.execute(this.userId)

      ws.emit(REALTIME_EVENTS.aiReportRoom.generated, this.userId, 'oi')
    })
  }
}
