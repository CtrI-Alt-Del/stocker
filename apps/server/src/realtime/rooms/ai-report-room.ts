import { inventoryMovementsRepository, usersRepository } from '@/database'
import { aiProvider } from '@/providers'
import { REALTIME_EVENTS } from '@stocker/core/constants'
import type { IRoom, IWs } from '@stocker/core/interfaces'
import { ReportInventoryWithAiUseCase } from '@stocker/core/use-cases'

export class AiReportRoom implements IRoom {
  constructor(private readonly userId: string) {}
  handle(ws: IWs): void {
    ws.on(REALTIME_EVENTS.aiReportRoom.requested, this.userId, async () => {
      const useCase = new ReportInventoryWithAiUseCase(
        inventoryMovementsRepository,
        usersRepository,
        aiProvider,
      )
      await useCase.execute({
        userId: this.userId,
        onGenerateChunck: (chunck) => {
          ws.emit(REALTIME_EVENTS.aiReportRoom.generated, this.userId, chunck)
        },
      })
    })
  }
}
