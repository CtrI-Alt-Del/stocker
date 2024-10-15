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

  async findMany(
    params: InventoryMovementsListParams,
  ): Promise<{ inventoryMovements: InventoryMovement[]; count: number }> {
    throw new Error('Method not implemented.')
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
