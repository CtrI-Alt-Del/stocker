import { User } from '../../domain/entities'
import type { UserDto } from '../../dtos'
import { NotFoundError } from '../../errors'
import type {
  ICompaniesRepository,
  IQueueProvider,
  IUsersRepository,
} from '../../interfaces'

type Request = {
  userDto: UserDto
}
export class RegisterUserUseCase {
  private readonly usersRepository: IUsersRepository
  private readonly companiesRepository: ICompaniesRepository
  private readonly queueProvider: IQueueProvider

  constructor(
    usersRepository: IUsersRepository,
    companiesRepository: ICompaniesRepository,
    queueProvider: IQueueProvider,
  ) {
    this.usersRepository = usersRepository
    this.companiesRepository = companiesRepository
    this.queueProvider = queueProvider
  }

  async execute({ userDto }: Request) {
    const user = User.create(userDto)
    await this.usersRepository.add(user)
    const company = await this.companiesRepository.findById(user.companyId)
    if (!company) throw new NotFoundError('Empresa não encontrada')

    this.queueProvider.push('send-welcome-employee-email', {
      companyName: user.name,
      employeeName: company.name,
    })

    return user.id
  }
}
