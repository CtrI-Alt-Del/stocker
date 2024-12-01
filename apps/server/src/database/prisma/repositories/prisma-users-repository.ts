import type { IUsersRepository } from '@stocker/core/interfaces'
import type { User } from '@stocker/core/entities'
import type { UsersListParams } from '@stocker/core/types'
import { PAGINATION } from '@stocker/core/constants'

import { PrismaUsersMapper } from '../mappers'
import { prisma } from '../prisma-client'
import { PrismaError } from '../prisma-error'

export class PrismaUsersRepository implements IUsersRepository {
  private readonly mapper: PrismaUsersMapper = new PrismaUsersMapper()

  async add(user: User): Promise<void> {
    try {
      const role = await prisma.role.findUnique({ where: { name: user.role } })
      if (!role) return

      const prismaRoles = await prisma.role.findMany()
      const prismaUser = this.mapper.toPrisma(user)
      await prisma.user.create({
        data: {
          id: prismaUser.id,
          name: prismaUser.name,
          email: prismaUser.email,
          password: prismaUser.password,
          role_id:
            prismaRoles.find((prismaRole) => prismaRole.name === prismaUser.role?.name)
              ?.id ?? '',
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
      const prismaRoles = await prisma.role.findMany()

      await prisma.user.createMany({
        data: prismaUsers.map((prismaUser) => {
          return {
            id: prismaUser.id,
            name: prismaUser.name,
            email: prismaUser.email,
            password: prismaUser.password,
            role_id:
              prismaRoles.find((prismaRole) => prismaRole.name === prismaUser.role?.name)
                ?.id ?? '',
            has_first_password_reset: prismaUser.has_first_password_reset,
            company_id: prismaUser.company_id,
          }
        }),
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
        },
        include: {
          role: {
            select: {
              name: true,
            },
          },
        },
        orderBy: { registered_at: 'desc' },
      })

      return prismaUsers.map((prismaUser) => this.mapper.toDomain(prismaUser, false))
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async findMany({ page, companyId, name, role }: UsersListParams) {
    try {
      const prismaUsers = await prisma.user.findMany({
        take: PAGINATION.itemsPerPage,
        skip: page > 0 ? (page - 1) * PAGINATION.itemsPerPage : 1,
        where: {
          company_id: companyId,
          ...(name && { name: { contains: name, mode: 'insensitive' } }),
          ...(role && { role: { name: role } }),
          AND: { role: { name: { not: 'admin' } } },
        },
        include: {
          role: {
            include: {
              permissions: true,
            },
          },
        },
        orderBy: { registered_at: 'desc' },
      })

      const count = await prisma.user.count({
        where: {
          company_id: companyId,
          ...(name && { name: { contains: name, mode: 'insensitive' } }),
          ...(role && {
            role: { name: role },
            AND: { role: { name: { not: 'admin' } } },
          }),
          AND: { role: { name: { not: 'admin' } } },
        },
      })

      const users = prismaUsers.map((prismaUser) =>
        this.mapper.toDomain(prismaUser, false),
      )

      return {
        users,
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
        include: {
          role: {
            select: {
              name: true,
            },
          },
        },
      })
      if (!prismaUser) return null
      return this.mapper.toDomain(prismaUser, false)
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async findByEmail(userEmail: string): Promise<User | null> {
    try {
      const prismaUser = await prisma.user.findFirst({
        where: { email: userEmail },
        include: {
          role: {
            select: {
              name: true,
            },
          },
        },
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
      const prismaRoles = await prisma.role.findMany()

      await prisma.user.update({
        data: {
          name: prismaUser.name,
          email: prismaUser.email,
          password: prismaUser.password,
          company_id: prismaUser.company_id,
          role_id:
            prismaRoles.find((prismaRole) => prismaRole.name === prismaUser.role?.name)
              ?.id ?? '',
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
        where: { role: { name: 'employee' }, company_id: companyId },
      })
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async countManagerUsersByCompany(companyId: string): Promise<number> {
    try {
      return await prisma.user.count({
        where: { role: { name: 'manager' }, company_id: companyId },
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
