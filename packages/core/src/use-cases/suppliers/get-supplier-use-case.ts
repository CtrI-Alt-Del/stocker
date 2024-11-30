import type { ISuppliersRepository } from '../../interfaces'
import { NotFoundError } from '../../errors'

type Request = {
  supplierId: string
}

export class GetSupplierUseCase {
  private readonly suppliersRepository: ISuppliersRepository
  constructor(suppliersRepository: ISuppliersRepository) {
    this.suppliersRepository = suppliersRepository
  }

  async execute({ supplierId }: Request) {
    const supplier = await this.suppliersRepository.findById(supplierId)

    if (!supplier) {
      throw new NotFoundError('Fornecedor não encontrado')
    }

    return supplier.dto
  }
}
