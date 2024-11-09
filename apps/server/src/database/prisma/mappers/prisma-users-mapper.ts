import type { UserRole as PrismaUserRole } from '@prisma/client'

import { User } from '@stocker/core/entities'
import type { UserRole } from '@stocker/core/types'

import type { PrismaUser } from '../types'

export class PrismaUsersMapper {
  toDomain(prismaUser: PrismaUser): User {
    return User.create({
      id: prismaUser.id,
      name: prismaUser.name,
      email: prismaUser.email,
      password: prismaUser.password,
      role: prismaUser.role.toLowerCase() as UserRole,
      hasFirstPasswordReset: prismaUser.has_first_password_reset,
      companyId: prismaUser.company_id,
    })
  }

  toPrisma(user: User): PrismaUser {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role.toUpperCase() as PrismaUserRole,
      has_first_password_reset: user.hasFirstPasswordReset,
      company_id: user.companyId,
      registered_at: new Date(),
    }
  }
}
