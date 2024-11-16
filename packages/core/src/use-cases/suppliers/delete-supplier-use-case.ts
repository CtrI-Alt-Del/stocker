import { NotFoundError } from '../../errors'
import type { ISuppliersRepository } from '../../interfaces/repositories/suppliers-repository'

type Request = {
  suppliersId: string[]
}

export class DeleteSuppliersUseCase {
  private readonly supplierRepository: ISuppliersRepository

  constructor(supplierRepository: ISuppliersRepository) {
    this.supplierRepository = supplierRepository
  }

  async execute({ suppliersId }: Request) {
    for (const supplierId of suppliersId) {
      const supplier = await this.supplierRepository.findById(supplierId)
      if (!supplier) throw new NotFoundError('Fornecedor não encontrado')
    }

    await this.supplierRepository.deleteMany(suppliersId)
  }
}
