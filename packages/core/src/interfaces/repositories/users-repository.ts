import type { User } from '../../domain/entities'
import type { UsersListParams } from '../../types'

export interface IUsersRepository {
  findMany(params: UsersListParams): Promise<{ users: User[]; count: number }>
  findById(userId: string): Promise<User | null>
  findByEmail(userEmail: string): Promise<User | null>
  findAllByCompany(companyId: string): Promise<User[]>
  add(user: User): Promise<void>
  addMany(users: User[]): Promise<void>
  update(user: User, userId: string): Promise<void>
  deleteMany(usersIds: string[]): Promise<void>
  updatePassword(userId: string, newPassword: string): Promise<void>
  countManagerUsersByCompany(companyId: string): Promise<number>
  countEmployeeUsersByCompany(companyId: string): Promise<number>
}
