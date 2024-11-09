import { companiesRepository, usersRepository } from '@/database'
import { HTTP_STATUS_CODE } from '@stocker/core/constants'
import type { CompanyDto, UserDto } from '@stocker/core/dtos'
import { User } from '@stocker/core/entities'
import type { IHttp } from '@stocker/core/interfaces'
import { UpdateCompanyUseCase, UpdateUserUseCase } from '@stocker/core/use-cases'

type Body = {
  user: Partial<UserDto>
  company: Partial<CompanyDto>
}

export class UpdateAccountController {
  async handle(http: IHttp) {
    const { user, company } = http.getBody<Body>()
    const currentUser = User.create(await http.getUser())

    const updateCompanyUseCase = new UpdateCompanyUseCase(companiesRepository)
    await updateCompanyUseCase.execute({ companyId: currentUser.id, companyDto: company })

    const updateUserUseCase = new UpdateUserUseCase(usersRepository)
    const updatedUser = await updateUserUseCase.execute({
      userId: currentUser.id,
      userDto: user,
    })

    const jwt = await http.setJwt(updatedUser.dto)

    return http.send({ jwt }, HTTP_STATUS_CODE.created)
  }
}