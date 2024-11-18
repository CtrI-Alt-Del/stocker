import { Supplier } from '@stocker/core/entities'
import type { PrismaSupplier } from '../types'

export class PrismaSuppliersMapper {
  toDomain(prismaSupplier: PrismaSupplier): Supplier {
    return Supplier.create({
      id: prismaSupplier.id,
      name: prismaSupplier.name,
      email: prismaSupplier.email,
      cnpj: prismaSupplier.cnpj || '',
      phone: prismaSupplier.phone || '',
      companyId: prismaSupplier.company_id
    })
  }

  toPrisma(supplier: Supplier): PrismaSupplier {
    return {
      id: supplier.id,
      name: supplier.name,
      email: supplier.email,
      cnpj:  supplier.cnpj || null,
      phone: supplier.phone || null,
      company_id: supplier.companyId,
      registered_at: new Date(),
    }
  }
}
