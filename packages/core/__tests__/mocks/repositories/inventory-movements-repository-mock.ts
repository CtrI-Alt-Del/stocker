import { PAGINATION } from '../../../src/constants'
import type { InventoryMovement } from '../../../src/domain/entities'
import type { IInventoryMovementsRepository } from '../../../src/interfaces'
import type {
  InventoryMovementsListParams,
  FindByDateRangeParams,
} from '../../../src/types'

export class InventoryMovementsRepositoryMock implements IInventoryMovementsRepository {
  inventoryMovements: InventoryMovement[] = []

  async add(inventoryMovement: InventoryMovement): Promise<void> {
    this.inventoryMovements.push(inventoryMovement)
  }

  async findMany({ page, productId }: InventoryMovementsListParams): Promise<{
    inventoryMovements: InventoryMovement[]
    count: number
  }> {
    let inventoryMovements = this.inventoryMovements

    if (page) {
      const startIndex = (page - 1) * PAGINATION.itemsPerPage
      inventoryMovements = this.inventoryMovements.slice(
        startIndex,
        startIndex + PAGINATION.itemsPerPage,
      )
    }

    if (productId) {
      inventoryMovements = inventoryMovements.filter(
        (movement) => movement.product.id === productId,
      )
    }

    return {
      inventoryMovements,
      count: this.inventoryMovements.length,
    }
  }

  async countItems(): Promise<number> {
    throw new Error('Method not implemented.')
  }

  async countInbound(): Promise<number> {
    throw new Error('Method not implemented.')
  }

  async countOutbound(): Promise<number> {
    throw new Error('Method not implemented.')
  }

  async findByDateRange(params: FindByDateRangeParams): Promise<InventoryMovement[]> {
    throw new Error('Method not implemented.')
  }
}
