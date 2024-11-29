import type { LocationDto } from '@stocker/core/dtos'
import type { IHttp } from '@stocker/core/interfaces'

import { locationsRepository } from '@/database'
import { UpdateLocationUseCase } from '@stocker/core/use-cases'
import { HTTP_STATUS_CODE } from '@stocker/core/constants'
import { User } from '@stocker/core/entities'

type RouteParams = {
  locationId: string
}

export class UpdateLocationController {
  async handle(http: IHttp) {
    const { locationId } = http.getRouteParams<RouteParams>()
    const { companyId } = await http.getUser()
    const locationDto = http.getBody<Partial<LocationDto>>()

    const useCase = new UpdateLocationUseCase(locationsRepository)
    await useCase.execute({ locationId, locationDto, companyId })

    return http.send(companyId, HTTP_STATUS_CODE.ok)
  }
}
