import { ListInventoryMovementsUseCase } from '@stocker/core/use-cases'
import type { IHttp } from '@stocker/core/interfaces'
import { HTTP_STATUS_CODE } from '@stocker/core/constants'
import { inventoryMovementsRepository } from '@/database'

type QueryParams = {
  page?: string
  productId?: string
  responsibleId?: string
  startDate?: string
  endDate?: string
  movementType?: 'inbound' | 'outbound'
}

export class ListInventoryMovementsController {
  async handle(http: IHttp) {
    const { page, productId, responsibleId, startDate, endDate, movementType } =
      http.getQueryParams<QueryParams>()
    const { companyId } = await http.getUser()
    const useCase = new ListInventoryMovementsUseCase(inventoryMovementsRepository)

    const params = {
      page: page ? Number(page) : 1,
      companyId,
      productId,
      responsibleId,
      movementType,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
    }
    const result = await useCase.execute(params)

    return http.send(result, HTTP_STATUS_CODE.ok)
  }
}
