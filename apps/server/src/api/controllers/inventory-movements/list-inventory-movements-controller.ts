import { ListInventoryMovementsUseCase } from '@stocker/core/use-cases'
import type { IHttp } from '@stocker/core/interfaces'
import { HTTP_STATUS_CODE } from '@stocker/core/constants'
import { inventorymovementRepository } from '@/database'
import type { InventoryMovementsListParams } from '@stocker/core/types'

export class ListInventoryMovementsController {
  async handle(http: IHttp) {
    const queryParams = http.getQueryParams<InventoryMovementsListParams>()
    const useCase = new ListInventoryMovementsUseCase(inventorymovementRepository)
    const result = await useCase.execute({
      page: parseInt(String(queryParams.page)) || 1,
      productId: queryParams.productId,
    })
    return http.send(result, HTTP_STATUS_CODE.ok)
  }
}
