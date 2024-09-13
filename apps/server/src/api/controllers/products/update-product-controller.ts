import { productsRepository } from '@/database/prisma/repositories'
import type { ProductDto } from '@stocker/core/src/dtos'
import type { IHttp } from '@stocker/core/src/interfaces'
import { UpdateProductUseCase } from '@stocker/core/src/use-cases'

type RouteParams = {
  productId: string
}

export class UpdateProductController {
  async handle(http: IHttp) {
    const { productId } = http.getRouteParams<RouteParams>()
    const useCase = new UpdateProductUseCase(productsRepository)
    const productDto = http.getBody<Partial<ProductDto>>()
    await useCase.execute({ productId, productDto })

    return http.send(null)
  }
}
