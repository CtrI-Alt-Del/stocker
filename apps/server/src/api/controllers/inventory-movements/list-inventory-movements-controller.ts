import { ListInventoryMovementsUseCase } from '@stocker/core/use-cases'
import type { IHttp } from '@stocker/core/interfaces'
import { HTTP_STATUS_CODE } from '@stocker/core/constants'
import { inventoryMovementsRepository } from '@/database'

type QueryParams = {
  page?: string
  productId?: string
}

export class ListInventoryMovementsController {
  async handle(http: IHttp) {
    const { page, productId } = http.getQueryParams<QueryParams>()
    const { companyId } = await http.getUser()
    const useCase = new ListInventoryMovementsUseCase(inventoryMovementsRepository)
    const pageNumber = parseInt(page || '1', 10)
    const result = await useCase.execute({
      page: pageNumber,
      productId: productId,
      companyId: companyId
    })
    return http.send(result, HTTP_STATUS_CODE.ok)
  }
}
