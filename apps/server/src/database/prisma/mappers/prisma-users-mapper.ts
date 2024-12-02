import { User } from '@stocker/core/entities'

import type { PrismaUser } from '../types'

export class PrismaUsersMapper {
  toDomain(prismaUser: PrismaUser, includePassword = true): User {
    return User.create(
      {
        id: prismaUser.id,
        name: prismaUser.name,
        email: prismaUser.email,
        password: prismaUser.password,
        role: String(prismaUser.role?.name),
        hasFirstPasswordReset: prismaUser.has_first_password_reset,
        companyId: prismaUser.company_id,
      },
      includePassword,
    )
  }

  toPrisma(user: User): PrismaUser {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: String(user.password),
      role_id: '',
      role: { name: user.role },
      has_first_password_reset: user.hasFirstPasswordReset,
      company_id: user.companyId,
      registered_at: new Date(),
    }
  }
}
