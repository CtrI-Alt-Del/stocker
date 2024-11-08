import type { User } from '../../../src/domain/entities'
import { NotFoundError } from '../../../src/errors'
import type { IUsersRepository } from '../../../src/interfaces'
import type { UsersListParams } from '../../../src/types'

export class UsersRepositoryMock implements IUsersRepository {
  users: User[] = []

  async findMany({ page }: UsersListParams): Promise<{ users: User[], count: number }> {
    const startIndex = (page - 1) * 10
    return {
      users: this.users.slice(startIndex, startIndex + 10),
      count: this.users.length
    }
  }

  async findById(userId: string): Promise<User | null> {
    const user = this.users.find((user) => user.id === userId) ?? null
    return user
  }

  async add(user: User): Promise<void> {
    this.users.push(user)
  }

  async findByEmail(userEmail: string): Promise<User | null> {
    const email = this.users.find((user) => user.email === userEmail)

    if (!email) {
      throw new NotFoundError();
    }

    return email
  }

  async update(user: User): Promise<void> {
    this.users = this.users.map((existingUser) =>
      existingUser.id === user.id ? user : existingUser
    )
  }

  async deleteMany(userIds: string[]): Promise<void> {
    this.users = this.users.filter(
      (currentUser) => !userIds.includes(currentUser.id),
    )
  }

  async updatePassword(userId: string, newPassword: string): Promise<void> {
    const user = this.users.find((user) => user.id === userId);

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    user.update({ password: newPassword })
  }

  async countEmployeeUsersByCompany(companyId: string): Promise<number> {
    try {
      const employees = this.users.filter(user => user.role === 'employee' && user.companyId === companyId);
      return employees.length;
    } catch (error) {
      console.error(error);
      throw new Error('fudeu');
    }
  }

  async countManagerUsersByCompany(companyId: string): Promise<number> {
    try {
      const managers = this.users.filter(user => user.role === 'manager' && user.companyId === companyId);
      return managers.length;
    } catch (error) {
      console.error(error);
      throw new Error('fudeu');
    }
  }
}

// async countEmployeeUsersByCompany(companyId: string): Promise<number> {
//
// }

// async countManagerUsersByCompany(companyId: string): Promise<number> {
//   try {
//     return await prisma.user.count({
//       where: { role: 'MANAGER', company_id: companyId },
//     })
//   } catch (error) {
//     throw new PrismaError(error)
//   }
// }