import type { IHttp } from '@stocker/core/interfaces'
import { DeleteProductUseCase } from '@stocker/core/use-cases'
import { productsRepository } from '@/database/prisma/repositories'

type RouteParams = {
  productId: string
}

export class DeleteProductController {
  async handle(http: IHttp) {
    const { productId } = http.getRouteParams<RouteParams>()
    const useCase = new DeleteProductUseCase(productsRepository)
    await useCase.execute({
      productId,
    })
    return http.send(null)
  }
}
