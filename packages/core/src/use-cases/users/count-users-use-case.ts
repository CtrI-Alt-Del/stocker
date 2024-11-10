import type { IUsersRepository } from '../../interfaces'

type Request = {
  companyId: string
}

export class CountCompanyUsersUseCase {
  private readonly userRepository: IUsersRepository
  constructor(userRepository: IUsersRepository) {
    this.userRepository = userRepository
  }

  async execute({ companyId }: Request) {
    const managersCount = await this.userRepository.countManagerUsersByCompany(companyId)
    const employeesCount =
      await this.userRepository.countEmployeeUsersByCompany(companyId)

    return { managersCount, employeesCount }
  }
}
