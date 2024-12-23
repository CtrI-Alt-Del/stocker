import type { Supplier } from '@stocker/core/entities'
import type { ISuppliersRepository } from '@stocker/core/interfaces'
import type { SuppliersListParams } from '@stocker/core/types'
import { PrismaSuppliersMapper } from '../mappers'
import { prisma } from '../prisma-client'
import { PrismaError } from '../prisma-error'
import { PAGINATION } from '@stocker/core/constants'

export class PrismaSuppliersRepository implements ISuppliersRepository {
  private readonly mapper: PrismaSuppliersMapper = new PrismaSuppliersMapper()

  async add(supplier: Supplier): Promise<void> {
    try {
      const prismaSupplier = this.mapper.toPrisma(supplier)
      await prisma.supplier.create({
        data: {
          id: prismaSupplier.id,
          email: prismaSupplier.email,
          name: prismaSupplier.name,
          cnpj: prismaSupplier.cnpj,
          phone: prismaSupplier.phone,
          company_id: prismaSupplier.company_id,
          registered_at: prismaSupplier.registered_at,
        },
      })
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async addMany(suppliers: Supplier[]): Promise<void> {
    try {
      const prismaSuppliers = suppliers.map(this.mapper.toPrisma)
      await prisma.supplier.createMany({
        data: prismaSuppliers.map((prismaSupplier) => ({
          id: prismaSupplier.id,
          email: prismaSupplier.email,
          name: prismaSupplier.name,
          cnpj: prismaSupplier.cnpj,
          phone: prismaSupplier.phone,
          company_id: prismaSupplier.company_id,
          registered_at: prismaSupplier.registered_at,
        })),
      })
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async deleteMany(suppliersIds: string[]): Promise<void> {
    try {
      await prisma.supplier.deleteMany({
        where: {
          id: { in: suppliersIds },
        },
      })
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async findById(supplierId: string): Promise<Supplier | null> {
    try {
      const prismaSupplier = await prisma.supplier.findUnique({
        where: { id: supplierId },
      })
      if (!prismaSupplier) return null
      return this.mapper.toDomain(prismaSupplier)
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async findByCnpj(cnpj: string): Promise<Supplier | null> {
    try {
      const prismaSupplier = await prisma.supplier.findFirst({
        where: {
          cnpj,
        },
      })

      if (!prismaSupplier) return null

      return this.mapper.toDomain(prismaSupplier)
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async findByEmail(email: string): Promise<Supplier | null> {
    try {
      const prismaSupplier = await prisma.supplier.findFirst({
        where: {
          email,
        },
      })

      if (!prismaSupplier) return null

      return this.mapper.toDomain(prismaSupplier)
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async findByPhone(phone: string): Promise<Supplier | null> {
    try {
      const prismaSupplier = await prisma.supplier.findFirst({
        where: {
          phone,
        },
      })

      if (!prismaSupplier) return null

      return this.mapper.toDomain(prismaSupplier)
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async findMany({ page, name, companyId }: SuppliersListParams) {
    try {
      const prismaSuppliers = await prisma.supplier.findMany({
        take: PAGINATION.itemsPerPage,
        skip: page > 0 ? (page - 1) * PAGINATION.itemsPerPage : 1,
        where: {
          company_id: companyId,
          ...(name && { name: { contains: name, mode: 'insensitive' } }),
        },
        orderBy: { registered_at: 'desc' },
      })

      const count = await prisma.supplier.count({
        where: {
          company_id: companyId,
          ...(name && { name: { contains: name, mode: 'insensitive' } }),
        },
      })

      const suppliers = prismaSuppliers.map(this.mapper.toDomain)

      return {
        suppliers,
        count,
      }
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async update(supplier: Supplier, supplierId: string): Promise<void> {
    try {
      const prismaSupplier = this.mapper.toPrisma(supplier)
      await prisma.supplier.update({
        data: {
          email: prismaSupplier.email,
          name: prismaSupplier.name,
          cnpj: prismaSupplier.cnpj,
          phone: prismaSupplier.phone,
        },
        where: { id: supplierId },
      })
    } catch (error) {
      throw new PrismaError(error)
    }
  }
}
