import type { UserDto } from '../../dtos'
import type { IUsersRepository } from '../../interfaces'
import { NotFoundError } from '../../errors'

type Request = {
  userDto: Partial<UserDto>
  userId: string
}

export class UpdateUserUseCase {
  private readonly userRepository: IUsersRepository
  constructor(userRepository: IUsersRepository) {
    this.userRepository = userRepository
  }

  async execute({ userId, userDto }: Request) {
    const user = await this.userRepository.findById(userId)
    if (!user) {
      throw new NotFoundError('Usuário não encontrado')
    }
    const updatedUser = user.update(userDto)
    await this.userRepository.update(updatedUser, user.id)

    return updatedUser
  }
}
