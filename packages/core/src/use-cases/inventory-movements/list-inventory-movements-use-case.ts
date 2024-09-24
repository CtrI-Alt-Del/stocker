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
    const items = await this.inventoryMovementsRepository.findMany({ page, productId })
    const itemsCount = await this.inventoryMovementsRepository.count()
    return new PaginationResponse({ items: items.map((item) => item.dto), itemsCount })
  }
}
