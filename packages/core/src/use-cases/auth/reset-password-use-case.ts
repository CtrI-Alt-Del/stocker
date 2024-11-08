import { NotFoundError } from '../../errors'
import type { ICryptoProvider, IUsersRepository } from '../../interfaces'

type Request = {
  email: string
  password: string
}
export class ResetPasswordUseCase {
  private readonly usersRepository: IUsersRepository
  private readonly cryptoProvider: ICryptoProvider

  constructor(usersRepository: IUsersRepository, cryptoProvider: ICryptoProvider) {
    this.usersRepository = usersRepository
    this.cryptoProvider = cryptoProvider
  }

  async execute({ email, password }: Request) {
    const user = await this.usersRepository.findByEmail(email)
    if (!user) throw new NotFoundError('Usuário não encontrado')

    const hashedPassword = await this.cryptoProvider.hash(password)
    await this.usersRepository.updatePassword(user.id, hashedPassword)

    user.password = hashedPassword
    user.hasFirstPasswordReset = false
    await this.usersRepository.update(user, user.id)
    return user.dto
  }
}
