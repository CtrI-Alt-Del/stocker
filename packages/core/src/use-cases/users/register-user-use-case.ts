import { User } from '../../domain/entities'
import type { UserDto } from '../../dtos'
import { ConflictError, NotFoundError } from '../../errors'
import type {
  ICompaniesRepository,
  ICryptoProvider,
  IQueueProvider,
  IUsersRepository,
} from '../../interfaces'

type Request = {
  userDto: UserDto
}
export class RegisterUserUseCase {
  private readonly usersRepository: IUsersRepository
  private readonly companiesRepository: ICompaniesRepository
  private readonly cryptoProvider: ICryptoProvider
  private readonly queueProvider: IQueueProvider

  constructor(
    usersRepository: IUsersRepository,
    companiesRepository: ICompaniesRepository,
    cryptoProvider: ICryptoProvider,
    queueProvider: IQueueProvider,
  ) {
    this.usersRepository = usersRepository
    this.companiesRepository = companiesRepository
    this.cryptoProvider = cryptoProvider
    this.queueProvider = queueProvider
  }

  async execute({ userDto }: Request) {
    const existingUser = await this.usersRepository.findByEmail(userDto.email)

    if (existingUser) {
      throw new ConflictError('E-mail já em uso')
    }

    if (userDto.password) {
      userDto.password = await this.cryptoProvider.hash(userDto.password)
    }

    const user = User.create(userDto)

    const company = await this.companiesRepository.findById(user.companyId)
    if (!company) throw new NotFoundError('Empresa não encontrada')

    await this.usersRepository.add(user)

    this.queueProvider.push('send-welcome-employee-email', {
      employeeEmail: user.email,
      employeeName: user.name,
      companyName: company.name,
    })

    return user.id
  }
}
