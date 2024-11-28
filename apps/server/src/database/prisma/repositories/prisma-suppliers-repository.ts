import type { Supplier } from '@stocker/core/entities'
import type { ISuppliersRepository } from '@stocker/core/interfaces'
import type { PaginationResponse } from '@stocker/core/responses'
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
      await prisma.suppliers.create({
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

      await prisma.suppliers.createMany({
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
      await prisma.suppliers.deleteMany({
        where: {
          id: { in: suppliersIds },
        },
      })
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async findById(supplierId: string): Promise<Supplier | null> {
    throw new Error('Method not implemented.')
  }

  async findByCnpj(cnpj: string): Promise<Supplier | null> {
    try {
      const prismaSupplier = await prisma.suppliers.findFirst({
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
      const prismaSupplier = await prisma.suppliers.findFirst({
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
      const prismaSupplier = await prisma.suppliers.findFirst({
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

  async findMany(params: SuppliersListParams) {
    try {
      const prismaSuppliers = await prisma.suppliers.findMany({
        take: PAGINATION.itemsPerPage,
        skip: params.page > 0 ? (params.page - 1) * PAGINATION.itemsPerPage : 1,
        where: {
          company_id: params.companyId,
        },
        orderBy: { registered_at: 'desc' },
      })

      const count = await prisma.suppliers.count()
      const suppliers = prismaSuppliers.map(this.mapper.toDomain)
      return {
        suppliers: suppliers,
        count: count,
      }
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async update(supplier: Supplier, supplierId: string): Promise<void> {
    try {
      const prismaSupplier = this.mapper.toPrisma(supplier)
      await prisma.suppliers.update({
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
