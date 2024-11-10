import type { User } from '../../domain/entities'
import type { UserDto } from '../../dtos'
import type { ApiResponse, PaginationResponse } from '../../responses'
import type { UsersListParams } from '../../types'

export interface IUsersService {
  listUsers(params: UsersListParams): Promise<ApiResponse<PaginationResponse<UserDto>>>
  countCompanyUsers(): Promise<
    ApiResponse<{ managersCount: number; employeesCount: number }>
  >
  getUser(userId: string): Promise<ApiResponse<UserDto>>
  registerUser(user: User): Promise<ApiResponse<void>>
  updateUser(partialUserDto: Partial<UserDto>, userId: string): Promise<ApiResponse<void>>
  deleteUser(usersIds: string[]): Promise<ApiResponse<void>>
}
