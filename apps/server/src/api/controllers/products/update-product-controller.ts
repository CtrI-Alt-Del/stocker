import { ProductDto } from '@stocker/core/dtos'
import { IHttp } from '@stocker/core/interfaces'
import { UpdateProductUseCase } from '@stocker/core/use-cases'

type RouteParams = {
  productId: string
}

export class UpdateProductController {
  async handle(http: IHttp) {
    const { productId } = http.getRouteParams<RouteParams>()
    const useCase = new UpdateProductUseCase()
    const productDto = http.getBody<Partial<ProductDto>>()
    await useCase.execute({ productId, productDto })

    return http.send(null)

  }
}
