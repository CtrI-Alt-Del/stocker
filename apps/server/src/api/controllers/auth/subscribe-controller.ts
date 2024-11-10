import { companiesRepository, usersRepository } from '@/database'
import { cryptoProvider } from '@/providers'
import { HTTP_STATUS_CODE } from '@stocker/core/constants'
import type { CompanyDto, UserDto } from '@stocker/core/dtos'
import type { IHttp } from '@stocker/core/interfaces'
import { SubscribeUseCase } from '@stocker/core/use-cases'

type Body = {
  user: UserDto
  company: CompanyDto
}

export class SubscribeController {
  async handle(http: IHttp) {
    const { user, company } = http.getBody<Body>()
    const useCase = new SubscribeUseCase(
      usersRepository,
      companiesRepository,
      cryptoProvider,
    )
    const createdUser = await useCase.execute({
      userDto: user,
      companyDto: company,
    })

    const jwt = await http.setJwt(createdUser.dto)

    return http.send({ jwt }, HTTP_STATUS_CODE.created)
  }
}
