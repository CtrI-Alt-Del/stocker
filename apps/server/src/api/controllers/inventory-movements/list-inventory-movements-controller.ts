import { ListInventoryMovementsUseCase } from '@stocker/core/use-cases'
import type { IHttp } from '@stocker/core/interfaces'
import { HTTP_STATUS_CODE } from '@stocker/core/constants'
import { inventoryMovementsRepository } from '@/database'

type QueryParams = {
  page?: string
  productId?: string
  employeeId?: string
  startDate?: string
  endDate?: string
  movementType?: 'inbound' | 'outbound'
}

export class ListInventoryMovementsController {
  async handle(http: IHttp) {
    const { page, productId, employeeId, startDate, endDate, movementType } =
      http.getQueryParams<QueryParams>()
    const { companyId } = await http.getUser()
    const useCase = new ListInventoryMovementsUseCase(inventoryMovementsRepository)
    const params = {
      page: page ? parseInt(page, 10) : undefined,
      companyId,
      productId,
      employeeId,
      movementType,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
    }
    const result = await useCase.execute(params)
    return http.send(result, HTTP_STATUS_CODE.ok)
  }
}
