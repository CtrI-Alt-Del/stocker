import type { IHttp } from '@stocker/core/interfaces'
import { DeleteProductsUseCase } from '@stocker/core/use-cases'

import { productsRepository } from '@/database'
import { fileStorageProvider } from '@/providers'

type Body = {
  productsIds: string[]
}

export class DeleteProductsController {
  async handle(http: IHttp) {
    const { productsIds } = http.getBody<Body>()

    const useCase = new DeleteProductsUseCase(productsRepository, fileStorageProvider)
    await useCase.execute({
      productsIds,
    })
    return http.send(null)
  }
}
