import type { InventoryMovementsListParams } from '../../types'
import type { IInventoryMovementsRepository } from '../../interfaces'
import { PaginationResponse } from '../../responses'

export class ListInventoryMovementsUseCase {
  private readonly inventoryMovementsRepository: IInventoryMovementsRepository

  constructor(inventoryMovementsRepository: IInventoryMovementsRepository) {
    this.inventoryMovementsRepository = inventoryMovementsRepository
  }

  async execute(params: InventoryMovementsListParams) {
    const { inventoryMovements, count } =
      await this.inventoryMovementsRepository.findMany(params)

    return new PaginationResponse({
      items: inventoryMovements.map((movement) => movement.dto),
      itemsCount: count,
    })
  }
}
