import type { SupplierDto } from '@stocker/core/dtos'
import type { IHttp } from '@stocker/core/interfaces'
import { UpdateSupplierUseCase } from '@stocker/core/use-cases'
import { suppliersRepository } from '@/database'
import { HTTP_STATUS_CODE } from '@stocker/core/constants'

type RouteParams = {
  supplierId: string
}

export class UpdateSupplierController {
  async handle(http: IHttp) {
    const { supplierId } = http.getRouteParams<RouteParams>()
    const useCase = new UpdateSupplierUseCase(suppliersRepository)
    const supplierDto = http.getBody<Partial<SupplierDto>>()
    await useCase.execute({ supplierId, supplierDto })

    return http.send({ supplierId }, HTTP_STATUS_CODE.ok)
  }
}
