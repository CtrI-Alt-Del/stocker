import type { InventoryMovement } from '@stocker/core/entities'

import type { IInventoryMovementsRepository } from '../../interfaces'

type Request = {
  productId?: string
}

export class ReportAnnualOutboundInventorymovementsUseCase {
  private readonly inventoryMovementsRepository: IInventoryMovementsRepository

  constructor(inventoryMovementsRepository: IInventoryMovementsRepository) {
    this.inventoryMovementsRepository = inventoryMovementsRepository
  }

  async execute({ productId }: Request) {
    const { inventoryMovements } = await this.inventoryMovementsRepository.findMany({
      productId,
    })

    const formattedMovements = this.formatByLast12Months(inventoryMovements)

    return formattedMovements
  }

  private formatByLast12Months(inventoryMovements: InventoryMovement[]) {
    // Obtém o mês e ano atuais
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth()
    const currentYear = currentDate.getFullYear()

    const months: {
      month: string
      year: number
      inboundMovementsCount: number
      outboundMovementsCount: number
    }[] = []

    for (let i = 0; i < 12; i++) {
      const monthDate = new Date(currentYear, currentMonth - i)
      const monthName = monthDate.toLocaleString('pt-BR', { month: 'long' })
      months.push({
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

      const monthIndex = months.findIndex(
        (month) =>
          month.year === movementYear &&
          new Date(movementYear, movementMonth).toLocaleString('pt-BR', {
            month: 'long',
          }) === month.month,
      )

      if (monthIndex !== -1 && months[monthIndex]) {
        if (movement.movementType === 'inbound') {
          months[monthIndex].inboundMovementsCount += movement.itemsCount
        } else if (movement.movementType === 'outbound') {
          months[monthIndex].outboundMovementsCount += movement.itemsCount
        }
      }
    })

    return months
  }
}
