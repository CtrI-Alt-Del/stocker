import { PAGINATION } from '../../../src/constants'
import type { InventoryMovement } from '../../../src/domain/entities'
import type { IInventoryMovementsRepository } from '../../../src/interfaces'
import { Datetime } from '../../../src/libs'
import type {
  InventoryMovementsListParams,
  FindByDateRangeParams,
} from '../../../src/types'

export class InventoryMovementsRepositoryMock implements IInventoryMovementsRepository {
  inventoryMovements: InventoryMovement[] = []

  async add(inventoryMovement: InventoryMovement): Promise<void> {
    this.inventoryMovements.push(inventoryMovement)
  }

  async addMany(inventoryMovements: InventoryMovement[]) {
    for (const inventoryMovement of inventoryMovements) {
      this.add(inventoryMovement)
    }
  }

  async findMany({
    page,
    productId,
    startDate,
    endDate,
    movementType,
    companyId,
    employeeId,
  }: InventoryMovementsListParams): Promise<{
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
        (movement) => movement.productId === productId,
      )
    }

    if (movementType) {
      inventoryMovements = inventoryMovements.filter(
        (movement) => movement.movementType === movementType,
      )
    }

    if (startDate && endDate) {
      inventoryMovements = inventoryMovements.filter((movement) => {
        const registeredAt = new Datetime(movement.registeredAt)
        return registeredAt.isBetween(startDate, endDate)
      })
    }

    return {
      inventoryMovements,
      count: this.inventoryMovements.length,
    }
  }

  async findAllByCompany(companyId: string): Promise<InventoryMovement[]> {
    throw new Error('Method not implemented.')
  }

  async findByDateRange(params: FindByDateRangeParams): Promise<InventoryMovement[]> {
    return this.inventoryMovements.filter((movement) => {
      const registeredAt = new Datetime(movement.registeredAt)
      return registeredAt.isBetween(params.startDate, params.endDate)
    })
  }

  async count(companyId: string): Promise<number> {
    throw new Error('Method not implemented.')
  }

  async countItems(): Promise<number> {
    let totalItems = 0
    for (const movement of this.inventoryMovements) {
      totalItems += movement.itemsCount
    }
    return totalItems
  }

  async countInbound(): Promise<number> {
    let totalInbound = 0
    for (const movement of this.inventoryMovements) {
      if (movement.movementType === 'inbound') {
        totalInbound += movement.itemsCount
      }
    }
    return totalInbound
  }

  async countOutbound(): Promise<number> {
    let totalOutbound = 0
    for (const movement of this.inventoryMovements) {
      if (movement.movementType === 'outbound') {
        totalOutbound += movement.itemsCount
      }
    }
    return totalOutbound
  }
}
