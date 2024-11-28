import type { IUsersRepository } from '@stocker/core/interfaces'
import type { User } from '@stocker/core/entities'
import type { UsersListParams } from '@stocker/core/types'
import { PrismaUsersMapper } from '../mappers'
import { prisma } from '../prisma-client'
import { PrismaError } from '../prisma-error'
import { PAGINATION } from '@stocker/core/constants'

export class PrismaUsersRepository implements IUsersRepository {
  private readonly mapper: PrismaUsersMapper = new PrismaUsersMapper()

  async add(user: User): Promise<void> {
    try {
      const prismaUser = this.mapper.toPrisma(user)
      await prisma.user.create({
        data: {
          id: prismaUser.id,
          name: prismaUser.name,
          email: prismaUser.email,
          password: prismaUser.password,
          role: prismaUser.role,
          has_first_password_reset: prismaUser.has_first_password_reset,
          company_id: prismaUser.company_id,
        },
      })
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async addMany(users: User[]): Promise<void> {
    try {
      const prismaUsers = users.map(this.mapper.toPrisma)
      await prisma.user.createMany({
        data: prismaUsers.map((prismaUser) => ({
          id: prismaUser.id,
          name: prismaUser.name,
          email: prismaUser.email,
          password: prismaUser.password,
          role: prismaUser.role,
          has_first_password_reset: prismaUser.has_first_password_reset,
          company_id: prismaUser.company_id,
        })),
      })
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async deleteMany(usersIds: string[]): Promise<void> {
    try {
      await prisma.user.deleteMany({
        where: {
          id: { in: usersIds },
        },
      })
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async findAllByCompany(companyId: string) {
    try {
      const prismaUsers = await prisma.user.findMany({
        where: {
          company_id: companyId,
          role: { not: 'ADMIN' },
        },
        orderBy: { registered_at: 'desc' },
      })

      return prismaUsers.map(this.mapper.toDomain)
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async findMany(params: UsersListParams) {
    try {
      const prismaUsers = await prisma.user.findMany({
        take: PAGINATION.itemsPerPage,
        skip: params.page > 0 ? (params.page - 1) * PAGINATION.itemsPerPage : 1,
        where: {
          company_id: params.companyId,
          role: { not: 'ADMIN' },
        },
        orderBy: { registered_at: 'desc' },
      })

      const count = await prisma.user.count({
        where: { company_id: params.companyId },
      })

      return {
        users: prismaUsers.map((prismaUser) => this.mapper.toDomain(prismaUser)),
        count,
      }
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async findById(userId: string): Promise<User | null> {
    try {
      const prismaUser = await prisma.user.findUnique({
        where: { id: userId },
      })
      if (!prismaUser) return null
      return this.mapper.toDomain(prismaUser)
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async findByEmail(userEmail: string): Promise<User | null> {
    try {
      const prismaUser = await prisma.user.findFirst({
        where: { email: userEmail },
      })
      if (!prismaUser) return null
      return this.mapper.toDomain(prismaUser)
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async update(user: User, userId: string): Promise<void> {
    try {
      const prismaUser = this.mapper.toPrisma(user)
      await prisma.user.update({
        data: {
          name: prismaUser.name,
          email: prismaUser.email,
          password: prismaUser.password,
          company_id: prismaUser.company_id,
          role: prismaUser.role,
          has_first_password_reset: prismaUser.has_first_password_reset,
        },
        where: { id: userId },
      })
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async countEmployeeUsersByCompany(companyId: string): Promise<number> {
    try {
      return await prisma.user.count({
        where: { role: 'EMPLOYEE', company_id: companyId },
      })
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async countManagerUsersByCompany(companyId: string): Promise<number> {
    try {
      return await prisma.user.count({
        where: { role: 'MANAGER', company_id: companyId },
      })
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async updatePassword(userId: string, newPassword: string): Promise<void> {
    try {
      await prisma.user.update({
        data: {
          password: newPassword,
          has_first_password_reset: false,
        },
        where: { id: userId },
      })
    } catch (error) {
      throw new PrismaError(error)
    }
  }
}
