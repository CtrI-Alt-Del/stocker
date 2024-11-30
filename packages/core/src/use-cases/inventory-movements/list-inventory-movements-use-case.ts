import type { InventoryMovementsListParams } from '../../types'
import type { IInventoryMovementsRepository } from '../../interfaces'
import type { InventoryMovement } from '../../domain/entities'

export class ListInventoryMovementsUseCase {
  private readonly inventoryMovementsRepository: IInventoryMovementsRepository

  constructor(inventoryMovementsRepository: IInventoryMovementsRepository) {
    this.inventoryMovementsRepository = inventoryMovementsRepository
  }

  async execute(
    params: InventoryMovementsListParams,
  ): Promise<{ inventoryMovements: InventoryMovement[]; count: number }> {
    const { inventoryMovements, count } =
      await this.inventoryMovementsRepository.findMany(params)
    return { inventoryMovements, count }
  }
}
