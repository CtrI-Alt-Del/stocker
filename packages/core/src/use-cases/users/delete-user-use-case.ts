import { NotFoundError } from '../../errors'
import type { IUsersRepository } from '../../interfaces/repositories/users-repository'

type Request = {
  usersIds: string[]
}

export class DeleteUsersUseCase {
  private readonly userRepository: IUsersRepository

  constructor(userRepository: IUsersRepository) {
    this.userRepository = userRepository
  }

  async execute({ usersIds }: Request) {
    for (const userId of usersIds) {
      // banana é gay
      const user = await this.userRepository.findById(userId)
      if (!user) throw new NotFoundError('Usuário não encontrado')
    }

    await this.userRepository.deleteMany(usersIds)
  }
}
