import { User } from '@stocker/core/entities'
import type { PrismaUser } from '../types'

export class PrismaUsersMapper {
  toDomain(prismaUser: PrismaUser): User {
    const user = User.create({
      id: prismaUser.id,
      name: prismaUser.name,
      email: prismaUser.email,
      password: prismaUser.password,
      role: prismaUser.role.toLowerCase() as 'admin' | 'manager' | 'employee',
      companyId: prismaUser.company_id,
    })
    return user
  }

  toPrisma(user: User): PrismaUser {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role.toUpperCase() as 'ADMIN' | 'MANAGER' | 'EMPLOYEE',
      company_id: user.companyId,
    }
  }
}
