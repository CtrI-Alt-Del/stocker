import type { IInventoryMovementsRepository } from '../../interfaces'
import { PaginationResponse } from '../../responses'

type Request = {
  page?: number
  productId?: string
  companyId: string
}

export class ListInventoryMovementsUseCase {
  private readonly inventoryMovementsRepository: IInventoryMovementsRepository
  constructor(inventoryMovementsRepository: IInventoryMovementsRepository) {
    this.inventoryMovementsRepository = inventoryMovementsRepository
  }

  async execute({ page, productId, companyId }: Request) {
    const { inventoryMovements, count } =
      await this.inventoryMovementsRepository.findMany({ page, productId, companyId })

    return new PaginationResponse({
      items: inventoryMovements.map((inventoryMovement) => inventoryMovement.dto),
      itemsCount: count,
    })
  }
}
