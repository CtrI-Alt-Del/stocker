import type { IUsersRepository } from '@stocker/core/interfaces'
import type { User } from '@stocker/core/entities'
import type { UsersListParams } from '@stocker/core/types'
import { PrismaUsersMapper } from '../mappers'

import { prisma } from '../prisma-client'
import { PrismaError } from '../prisma-error'

export class PrismaUsersRepository {
    private readonly mapper: PrismaUsersMapper = new PrismaUsersMapper()

    async add(user: User): Promise<void> {
        try {
            const prismaUser = this.mapper.toPrisma(user)

            await prisma.user.create({
                data: {
                    id: prismaUser.id,
                    name: prismaUser.name,
                    email: prismaUser.email,
                    company_id: prismaUser.company_id
                }
            })
        } catch (error) {
      throw new PrismaError(error)
    }
    }

}