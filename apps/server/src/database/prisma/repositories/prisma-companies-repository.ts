import type { Company } from '@stocker/core/entities'
import type { ICompaniesRepository } from '@stocker/core/interfaces'
import { PrismaCompaniesMapper } from '../mappers'
import { prisma } from '../prisma-client'
import { PrismaError } from '../prisma-error'

export class PrismaCompaniesRepository implements ICompaniesRepository {
  private readonly mapper: PrismaCompaniesMapper = new PrismaCompaniesMapper()

  async add(company: Company): Promise<void> {
    try {
      const prismaCompany = this.mapper.toPrisma(company)

      await prisma.company.create({
        data: {
          id: prismaCompany.id,
          name: prismaCompany.name,
          cnpj: prismaCompany.cnpj,
        },
      })
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async delete(companyId: string): Promise<void> {
    try {
      const company = await prisma.company.findUnique({
        where: {
          id: companyId,
        },
      })

      if (!company) {
        throw new PrismaError('Repository Error: Company not found')
      }

      await prisma.company.delete({
        where: {
          id: companyId,
        },
      })
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async findById(companyId: string): Promise<Company | null> {
    try {
      const prismaCompany = await prisma.company.findUnique({
        where: {
          id: companyId,
        },
      })

      if (!prismaCompany) return null

      return this.mapper.toDomain(prismaCompany)
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async update(company: Company, companyId: string): Promise<Company> {
    try {
      const prismaCompany = this.mapper.toPrisma(company)

      await prisma.company.update({
        data: {
          name: prismaCompany.name,
          cnpj: prismaCompany.cnpj,
        },
        where: {
          id: companyId,
        },
      })
      return company
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async findByCnpj(companyCnpj: string): Promise<Company | null> {
    try {
      const prismaCompany = await prisma.company.findFirst({
        where: {
          cnpj: companyCnpj,
        },
      })

      if (!prismaCompany) return null

      return this.mapper.toDomain(prismaCompany)
    } catch (error) {
      throw new PrismaError(error)
    }
  }
}
