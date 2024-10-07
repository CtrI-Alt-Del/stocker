import type { WeeklyInventoryMovementsDto } from '../../dtos/weekly-inventory-movements-dto'
import type { IInventoryMovementsRepository } from '../../interfaces'
import { Datetime } from '../../libs'

type Request = {
  productId?: string
}

const WEEKDAYS = ['seg', 'ter', 'qua', 'qui', 'ter', 'sáb', 'sex']

export class ReportWeeklyInventoryMovementsUseCase {
  private readonly inventoryMovementsRepository: IInventoryMovementsRepository

  constructor(inventoryMovementsRepository: IInventoryMovementsRepository) {
    this.inventoryMovementsRepository = inventoryMovementsRepository
  }

  async execute({ productId }: Request) {
    const endDate = new Date()
    const startDate = new Datetime(endDate).subtractDays(8)

    const { inventoryMovements: inboundInventoryMovements } =
      await this.inventoryMovementsRepository.findMany({
        startDate,
        endDate,
        movementType: 'inbound',
        productId,
      })

    const { inventoryMovements: outboundInventoryMovements } =
      await this.inventoryMovementsRepository.findMany({
        startDate,
        endDate,
        movementType: 'outbound',
        productId,
      })

    const currentDate = new Datetime(startDate)

    const data: WeeklyInventoryMovementsDto[] = []

    for (let index = 1; index <= 7; index++) {
      const weekday = WEEKDAYS[startDate.getDay()]
      if (!weekday) return

      const inboundInventoryMovementsCount = inboundInventoryMovements.reduce(
        (count, inventoryMovement) => {
          if (inventoryMovement.registeredAt.getDay() === startDate.getDay()) {
            return count + 1
          }
          return count
        },
        0,
      )

      const outboundInventoryMovementsCount = outboundInventoryMovements.reduce(
        (count, inventoryMovement) => {
          if (inventoryMovement.registeredAt.getDay() === startDate.getDay()) {
            return count + 1
          }
          return count
        },
        0,
      )

      data.push({
        weekday,
        inboundInventoryMovementsCount,
        outboundInventoryMovementsCount,
      })

      currentDate.addDays(1)
    }

    return data
  }
}
