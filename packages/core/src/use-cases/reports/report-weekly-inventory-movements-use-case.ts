import type { WeeklyInventoryMovementsDto } from '../../dtos/weekly-inventory-movements-dto'
import { NotAllowedError, NotFoundError } from '../../errors'
import type { IInventoryMovementsRepository, IProductsRepository } from '../../interfaces'
import { Datetime } from '../../libs'

type Request = {
  endDate?: Date
  productId?: string
}

const WEEKDAYS = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb']

export class ReportWeeklyInventoryMovementsUseCase {
  private readonly inventoryMovementsRepository: IInventoryMovementsRepository
  private readonly productsRepository: IProductsRepository

  constructor(
    inventoryMovementsRepository: IInventoryMovementsRepository,
    productsRepository: IProductsRepository,
  ) {
    this.inventoryMovementsRepository = inventoryMovementsRepository
    this.productsRepository = productsRepository
  }

  async execute({ endDate = new Date(), productId }: Request) {
    if (productId) {
      const product = await this.productsRepository.findById(productId)
      if (!product) throw new NotFoundError('Produto não encontrado')
      if (product.isInactive) throw new NotAllowedError('Produto inativo')
    }

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

    let currentDate = new Datetime(endDate)

    const data: WeeklyInventoryMovementsDto[] = []

    for (let index = 1; index <= 7; index++) {
      const weekday = WEEKDAYS[currentDate.getDate().getDay()]
      if (!weekday) return

      const inboundInventoryMovementsCount = inboundInventoryMovements.reduce(
        (count, inventoryMovement) => {
          if (
            inventoryMovement.registeredAt.getDay() === currentDate.getDate().getDay()
          ) {
            return count + 1
          }
          return count
        },
        0,
      )

      const outboundInventoryMovementsCount = outboundInventoryMovements.reduce(
        (count, inventoryMovement) => {
          if (
            inventoryMovement.registeredAt.getDay() === currentDate.getDate().getDay()
          ) {
            return count + 1
          }
          return count
        },
        0,
      )

      data.unshift({
        weekday,
        inboundInventoryMovementsCount,
        outboundInventoryMovementsCount,
      })

      currentDate = new Datetime(currentDate.subtractDays(1))
    }

    return data
  }
}
