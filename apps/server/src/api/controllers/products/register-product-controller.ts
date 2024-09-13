import type { IHttp } from '@stocker/core/src/interfaces'
import type { ProductDto } from '@stocker/core/src/dtos'
import { RegisterProductUseCase } from '@stocker/core/src/use-cases'
import { HTTP_STATUS_CODE } from '@stocker/core/src/constants'

import { productsRepository } from '@/database/prisma/repositories'

export class RegisterProductController {
  async handle(http: IHttp) {
    const productDto = http.getBody<ProductDto>()
    const useCase = new RegisterProductUseCase(productsRepository)
    await useCase.execute({ productDto })

    return http.send(null, HTTP_STATUS_CODE.created)
  }
}
