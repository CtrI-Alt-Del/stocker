import type { IUsersRepository } from '../../interfaces/repositories/users-repository'
import { PaginationResponse } from '../../responses'
import type { UserRole } from '../../types'

type Request = {
  page: number
  name?: string
  role?: UserRole
  companyId: string
}

export class ListUsersUseCase {
  private readonly usersRepository: IUsersRepository
  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute({ page, name, role, companyId }: Request) {
    const { users, count } = await this.usersRepository.findMany({ page, name, role, companyId })

    return new PaginationResponse({
      items: users.map((user) => user.dto),
      itemsCount: count,
    })
  }
}
