import type { User } from '../../domain/entities'
import type { UsersListParams } from '../../types'

export interface IUsersRepository {
  findMany(params: UsersListParams): Promise<User[]>
  findById(userId: string): Promise<User>
  add(user: User): Promise<void>
  update(user: User, userId: string): Promise<User>
  deleteMany(usersIds: string[], companyId: string): Promise<void>
}
