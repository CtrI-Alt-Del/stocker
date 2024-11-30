import type { IHttp } from '@stocker/core/interfaces'
import { GetSupplierUseCase } from '@stocker/core/use-cases'

import { suppliersRepository } from '@/database'

type RouteParams = {
  supplierId: string
}

export class GetSupplierController {
  async handle(http: IHttp) {
    const { supplierId } = http.getRouteParams<RouteParams>()
    const useCase = new GetSupplierUseCase(suppliersRepository)
    const supplierDto = await useCase.execute({ supplierId })

    return http.send(supplierDto)
  }
}
