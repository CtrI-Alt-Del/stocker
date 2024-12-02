import type { Company } from '@stocker/core/entities'
import type { ICompaniesRepository } from '@stocker/core/interfaces'
import type { Role } from '@stocker/core/structs'

import { PrismaCompaniesMapper, PrismaRoleMapper } from '../mappers'
import { prisma } from '../prisma-client'
import { PrismaError } from '../prisma-error'
import type { RoleName } from '@stocker/core/types'

export class PrismaCompaniesRepository implements ICompaniesRepository {
  private readonly mapper = new PrismaCompaniesMapper()
  private readonly roleMapper = new PrismaRoleMapper()

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

  async addRole(role: Role, companyId: string) {
    try {
      const prismaRole = await this.roleMapper.toPrisma(role)
      const prismaRoles = await prisma.role.findMany()

      await prisma.rolePermission.deleteMany({
        where: { role_id: prismaRole.id, company_id: companyId },
      })

      await prisma.rolePermission.createMany({
        data: prismaRole.permissions.map((permission) => ({
          name: permission.name,
          company_id: companyId,
          role_id:
            prismaRoles.find((prismaRole) => prismaRole.name === role.name)?.id ?? '',
        })),
      })
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async delete(companyId: string): Promise<void> {
    try {
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

  async findRolesById(companyId: string) {
    const prismaRoles = await prisma.role.findMany({
      where: {
        NOT: {
          name: 'admin',
        },
      },
      include: {
        permissions: {
          where: {
            company_id: companyId,
          },
        },
      },
    })

    return prismaRoles.map(this.roleMapper.toDomain)
  }

  async findRoleById(role: RoleName, companyId: string) {
    const prismaRole = await prisma.role.findUnique({
      where: {
        name: role,
      },
      include: {
        permissions: {
          where: {
            company_id: companyId,
          },
        },
      },
    })

    if (!prismaRole) return null

    return this.roleMapper.toDomain(prismaRole)
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

  async updateRole(role: Role, companyId: string): Promise<void> {
    try {
      await prisma.rolePermission.deleteMany({
        where: { company_id: companyId, role: { name: role.name } },
      })

      const prismaRole = await this.roleMapper.toPrisma(role)

      await prisma.rolePermission.createMany({
        data: prismaRole.permissions.map((permission) => ({
          role_id: prismaRole.id,
          company_id: companyId,
          name: permission.name,
        })),
      })
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async findByCnpj(companyCnpj: string): Promise<Company | null> {
    try {
      const prismaCompany = await prisma.company.findUnique({
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
