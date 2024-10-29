import type { User } from '../../domain/entities'
import type { UsersListParams } from '../../types'

export interface IUsersRepository {
  findMany(params: UsersListParams): Promise<{users: User[], count: number}>
  findById(userId: string): Promise<User | null>
  findByEmail(userEmail: string): Promise<User | null>
  add(user: User): Promise<void>
  update(user: User, userId: string): Promise<void>
  deleteMany(usersIds: string[], companyId: string): Promise<void>
}
