import type { SupplierDto } from '../../dtos'
import type { ISuppliersRepository } from '../../interfaces'
import { ConflictError, NotFoundError } from '../../errors'

type Request = {
  supplierDto: Partial<SupplierDto>
  supplierId: string
}

export class UpdateSupplierUseCase {
  private readonly supplierRepository: ISuppliersRepository
  constructor(supplierRepository: ISuppliersRepository) {
    this.supplierRepository = supplierRepository
  }

  async execute({ supplierId, supplierDto }: Request) {
    const supplier = await this.supplierRepository.findById(supplierId)

    if (!supplier) {
      throw new NotFoundError('Usuário não encontrado')
    }

    const updatedSupplier = supplier.update(supplierDto)

    const updatedSupplierCNPJ = await this.supplierRepository.findByCnpj(
      updatedSupplier.cnpj,
    )
    if (updatedSupplierCNPJ) {
      throw new ConflictError('Esse CNPJ já está em uso')
    }

    const updatedSupplierPhone = await this.supplierRepository.findByPhone(
      updatedSupplier.phone,
    )
    if (updatedSupplierPhone) {
      throw new ConflictError('Esse telefone já está em uso')
    }

    await this.supplierRepository.update(updatedSupplier, supplier.id)
  }
}
