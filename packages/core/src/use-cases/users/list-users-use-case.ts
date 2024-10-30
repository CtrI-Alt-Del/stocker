import { IUsersRepository } from '../../interfaces/repositories/users-repository'
import { PaginationResponse } from '../../responses'

type Request = {
  page: number,
  companyId: string
}

export class ListUsersUseCase {
  private readonly usersRepository: IUsersRepository
  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute({ page, companyId }: Request) {
    const { users, count } = await this.usersRepository.findMany({ page, companyId })

    return new PaginationResponse({
      items: users.map((user) => user.dto),
      itemsCount: count,
    })
  }
}
