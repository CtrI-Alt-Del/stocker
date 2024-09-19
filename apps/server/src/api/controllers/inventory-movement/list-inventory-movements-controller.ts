import { ListProductsUseCase } from '@stocker/core/use-cases'
import type { IHttp } from '@stocker/core/interfaces'
import { HTTP_STATUS_CODE } from '@stocker/core/constants'
import { productsRepository } from '@/database'
import type { InventoryMovementsListParams } from '@stocker/core/types'

export class ListInventoryMovementsController {
  async handle(http: IHttp) {
    const queryParams = http.getQueryParams<InventoryMovementsListParams>()
    const useCase = new ListProductsUseCase(productsRepository)
    const result = await useCase.execute({
      page: parseInt(queryParams.page.toString()) || 1,
    })
    return http.send(result, HTTP_STATUS_CODE.ok)
  }
}
