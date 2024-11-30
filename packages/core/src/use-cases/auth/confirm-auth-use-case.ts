import { NotFoundError } from '../../errors'
import type { ICryptoProvider, IUsersRepository } from '../../interfaces'

type Request = {
  email: string
  password: string
}

export class ConfirmAuthUseCase {
  private readonly userRepository: IUsersRepository
  private readonly cryptoProvider: ICryptoProvider

  constructor(userRepository: IUsersRepository, cryptoProvider: ICryptoProvider) {
    this.userRepository = userRepository
    this.cryptoProvider = cryptoProvider
  }

  async execute({ email, password }: Request) {
    const user = await this.userRepository.findByEmail(email)
    if (!user) {
      throw new NotFoundError('Usuário não encontrado')
    }

    const isPasswordValid = await this.cryptoProvider.validateHash(
      password,
      String(user.password),
    )

    return isPasswordValid
  }
}
