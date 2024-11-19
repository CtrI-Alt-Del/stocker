import { NotFoundError } from '../../errors'
import type { ISuppliersRepository } from '../../interfaces/repositories/suppliers-repository'

type Request = {
  suppliersIds: string[]
}

export class DeleteSuppliersUseCase {
  private readonly supplierRepository: ISuppliersRepository

  constructor(supplierRepository: ISuppliersRepository) {
    this.supplierRepository = supplierRepository
  }

  async execute({ suppliersIds }: Request) {
    for (const supplierId of suppliersIds) {
      const supplier = await this.supplierRepository.findById(supplierId)
      if (!supplier) throw new NotFoundError('Fornecedor não encontrado')
    }

    await this.supplierRepository.deleteMany(suppliersIds)
  }
}
