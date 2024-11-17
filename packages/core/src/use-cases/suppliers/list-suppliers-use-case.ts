import type { ISuppliersRepository } from '../../interfaces/repositories/suppliers-repository'
import { PaginationResponse } from '../../responses'

type Request = {
  page: number,
  companyId: string
}

export class ListSuplliersUseCase {
  private readonly suppliersRepository: ISuppliersRepository
  constructor(suppliersRepository: ISuppliersRepository) {
    this.suppliersRepository = suppliersRepository
  }

  async execute({ page, companyId }: Request) {
    const { suppliers, count } = await this.suppliersRepository.findMany({ page, companyId })

    return new PaginationResponse({
      items: suppliers.map((supplier) => supplier.dto),
      itemsCount: count,
    })
  }
}