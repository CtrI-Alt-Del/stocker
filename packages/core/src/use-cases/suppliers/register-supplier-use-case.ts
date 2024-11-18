import { ConflictError } from '../../errors'
import { Supplier } from '../../domain/entities'
import type { SupplierDto } from '../../dtos'
import type { ISuppliersRepository } from '../../interfaces'

type Request = {
  supplierDto: SupplierDto
}
export class RegisterSupplierUseCase {
  private readonly suppliersRepository: ISuppliersRepository

  constructor(suppliersRepository: ISuppliersRepository) {
    this.suppliersRepository = suppliersRepository
  }

  async execute({ supplierDto }: Request) {
    const existingEmailSupplier = await this.suppliersRepository.findByEmail(
      supplierDto.email,
    )

    if (existingEmailSupplier) {
      throw new ConflictError('E-mail já em uso')
    }

    const existingCNPJSupplier = await this.suppliersRepository.findByCnpj(
      supplierDto.cnpj,
    )
    if (existingCNPJSupplier) {
      throw new ConflictError('CNPJ já em uso')
    }

    const existingPhoneSupplier = await this.suppliersRepository.findByPhone(
      supplierDto.phone,
    )
    if (existingPhoneSupplier) {
      throw new ConflictError('Telefone já em uso')
    }

    const supplier = Supplier.create(supplierDto)

    await this.suppliersRepository.add(supplier)
  }
}
