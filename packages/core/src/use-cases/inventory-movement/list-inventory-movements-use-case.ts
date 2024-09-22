import type { IInventoryMovementsRepository } from '../../interfaces'
import { PaginationResponse } from '../../responses'

type Request = {
  page: number
}

export class ListInventoryMovementsUseCase {
  constructor(
    private readonly inventoryMovementsRepository: IInventoryMovementsRepository,
  ) {}

  async execute({ page }: Request) {
    const items = await this.inventoryMovementsRepository.findMany({ page })
    const itemsCount = await this.inventoryMovementsRepository.count()
    return new PaginationResponse({ items: items.map((item) => item.dto), itemsCount })
  }
}
