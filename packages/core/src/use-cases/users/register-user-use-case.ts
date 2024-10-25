import { User } from "../../domain/entities";
import { UserDto } from "../../dtos";
import { IUsersRepository } from "../../interfaces/repositories/users-repository";

type Request = {
  userDto: UserDto
}
export class RegisterUserUseCase {
  private readonly usersRepository: IUsersRepository

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute({ userDto }: Request) {
    const user = User.create(userDto)
    await this.usersRepository.add(user)
    return user.id
  }
}
