import type { InventoryMovement } from '@stocker/core/entities'

import type { IInventoryMovementsRepository } from '../../interfaces'
import { Datetime } from '../../libs'

type Request = {
  productId?: string
  currentDate?: Date
}

export class ReportAnnualOutboundInventoryMovementsUseCase {
  private readonly inventoryMovementsRepository: IInventoryMovementsRepository

  constructor(inventoryMovementsRepository: IInventoryMovementsRepository) {
    this.inventoryMovementsRepository = inventoryMovementsRepository
  }

  async execute({ productId, currentDate = new Date() }: Request) {
    const { inventoryMovements } = await this.inventoryMovementsRepository.findMany({
      productId,
      startDate: new Datetime(currentDate).subtractYears(1),
      endDate: currentDate,
    })

    const formattedMovements = this.formatByLast12data(inventoryMovements)

    return formattedMovements
  }

  private formatByLast12data(inventoryMovements: InventoryMovement[]) {
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth()
    const currentYear = currentDate.getFullYear()

    const data: {
      month: string
      year: number
      inboundMovementsCount: number
      outboundMovementsCount: number
    }[] = []

    for (let i = 0; i < 12; i++) {
      const monthDate = new Date(currentYear, currentMonth - i)
      const monthName = monthDate.toLocaleString('pt-BR', { month: 'long' })
      data.push({
        month: monthName,
        year: monthDate.getFullYear(),
        inboundMovementsCount: 0,
        outboundMovementsCount: 0,
      })
    }

    inventoryMovements.forEach((movement) => {
      const movementDate = new Date(movement.registeredAt)
      const movementMonth = movementDate.getMonth()
      const movementYear = movementDate.getFullYear()

      const monthIndex = data.findIndex(
        ({ year, month }) =>
          year === movementYear &&
          new Date(movementYear, movementMonth).toLocaleString('pt-BR', {
            month: 'long',
          }) === month,
      )

      if (monthIndex !== -1 && data[monthIndex]) {
        if (movement.movementType === 'inbound') {
          data[monthIndex].inboundMovementsCount += 1
        } else if (movement.movementType === 'outbound') {
          data[monthIndex].outboundMovementsCount += 1
        }
      }
    })

    return data.reverse()
  }
}
