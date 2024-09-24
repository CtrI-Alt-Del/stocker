import { productsRepository } from '@/database'
import { ListProductsStocksUseCase } from '@stocker/core/use-cases'
import type { IHttp } from '@stocker/core/interfaces'
import { HTTP_STATUS_CODE } from '@stocker/core/constants'
import type { ProducsStocksListParams } from '@stocker/core/types'

export class ListProductsStocksController {
  async handle(http: IHttp) {
    const { page } = http.getQueryParams<ProducsStocksListParams>()
    const useCase = new ListProductsStocksUseCase(productsRepository)
    const products = await useCase.execute({ page })
    return http.send(products, HTTP_STATUS_CODE.ok)
  }
}
