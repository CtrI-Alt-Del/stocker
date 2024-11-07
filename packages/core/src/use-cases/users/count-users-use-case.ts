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
    const usersManagers = await this.userRepository.countManagerUsersByCompany(companyId)
    const usersEmployees =
      await this.userRepository.countEmployeeUsersByCompany(companyId)
    return { usersManagers, usersEmployees }
  }
}
