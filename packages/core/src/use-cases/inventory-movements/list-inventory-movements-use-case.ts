import type { IInventoryMovementsRepository } from '../../interfaces'
import { PaginationResponse } from '../../responses'

type Request = {
  page: number
  productId: string
}

export class ListInventoryMovementsUseCase {
  constructor(
    private readonly inventoryMovementsRepository: IInventoryMovementsRepository,
  ) {}

  async execute({ page, productId }: Request) {
    const { inventoryMovements, count } =
      await this.inventoryMovementsRepository.findMany({ page, productId })

    return new PaginationResponse({
      items: inventoryMovements.map((inventoryMovement) => inventoryMovement.dto),
      itemsCount: count,
    })
  }
}
