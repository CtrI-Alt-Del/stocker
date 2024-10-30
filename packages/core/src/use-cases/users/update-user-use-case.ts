import type { UserDto } from '../../dtos'
import { NotFoundError } from '../../errors'
import { IUsersRepository } from '../../interfaces/repositories/users-repository'

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
      throw new NotFoundError('User não encontrado')
    }
    const updatedUser = user.update(userDto)
    await this.userRepository.update(updatedUser,user.id)
  }
}
