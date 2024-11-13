import type { IHttp } from '@stocker/core/interfaces'
import { HTTP_STATUS_CODE } from '@stocker/core/constants'
import { RegisterSupplierUseCase } from '@stocker/core/use-cases'
import type { SupplierDto } from '@stocker/core/dtos'
import { suppliersRepository } from '@/database'

export class RegisterSupplierController {
  async handle(http: IHttp) {
    const supplierDto = http.getBody<SupplierDto>()
    const useCase = new RegisterSupplierUseCase(suppliersRepository)
    const supplierId = await useCase.execute({ supplierDto })

    return http.send({ supplierId }, HTTP_STATUS_CODE.created)
  }
}
