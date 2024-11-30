import { locationsRepository } from '@/database'
import type { IHttp } from '@stocker/core/interfaces'
import { ListLocationsUseCase } from '@stocker/core/use-cases'

type QueryParams = {
  page: number
  name?: string
}

export class ListLocationsController {
  async handle(http: IHttp) {
    const user = await http.getUser()
    const companyId = user.companyId
    const { page, name } = http.getQueryParams<QueryParams>()

    const useCase = new ListLocationsUseCase(locationsRepository)
    const locationsDto = await useCase.execute({ companyId, page, name })

    return http.send(locationsDto)
  }
}
