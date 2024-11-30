import type { IApiClient, IUsersService } from '@stocker/core/interfaces'
import type { User } from '@stocker/core/entities'
import type { UserDto } from '@stocker/core/dtos'
import type { PaginationResponse } from '@stocker/core/responses'

export const UsersService = (apiClient: IApiClient): IUsersService => {
  return {
    async registerUser(user: User) {
      return await apiClient.post('/users', user.dto)
    },

    async getUser(userId: string) {
      return await apiClient.get<UserDto>(`/users/${userId}`)
    },

    async listUsers({ page, name, role }) {
      apiClient.setParam('name', String(name))
      apiClient.setParam('role', String(role))
      apiClient.setParam('page', String(page))
      return await apiClient.get<PaginationResponse<UserDto>>('/users')
    },

    async updateUser(partialUserDto: Partial<UserDto>, userId: string) {
      return await apiClient.put(`/users/${userId}`, partialUserDto)
    },

    async deleteUser(usersIds: string[]) {
      return await apiClient.delete('/users', { usersIds })
    },

    async countCompanyUsers() {
      return await apiClient.get<{ managersCount: number; employeesCount: number }>(
        '/users/company',
      )
    },
  }
}
