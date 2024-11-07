import { User } from "../../domain/entities";
import type { UserDto } from "../../dtos";
import type { ICryptoProvider } from "../../interfaces";
import type { IUsersRepository } from "../../interfaces/repositories/users-repository";

type Request = {
  userDto: UserDto
}
export class RegisterUserUseCase {
  private readonly usersRepository: IUsersRepository
  private readonly bcryptPRovider: ICryptoProvider
  constructor(usersRepository: IUsersRepository,bcryptPRovider: ICryptoProvider) {
    this.bcryptPRovider = bcryptPRovider
    this.usersRepository = usersRepository
  }

  async execute({ userDto }: Request) {
    if (userDto.password) {
      userDto.password = await this.bcryptPRovider.hash(userDto.password)
      
    }
    const user = User.create(userDto)
    await this.usersRepository.add(user)
    return user.id
  }
}
