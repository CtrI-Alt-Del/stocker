import type { IHttp } from '@stocker/core/interfaces'
import type { ProductDto } from '@stocker/core/dtos'
import { RegisterProductUseCase } from '@stocker/core/use-cases'
import { HTTP_STATUS_CODE } from '@stocker/core/constants'

import { productsRepository } from '@/database/prisma/repositories'

export class RegisterProductController {
  async handle(http: IHttp) {
    const productDto = http.getBody<ProductDto>()
    const useCase = new RegisterProductUseCase(productsRepository)
    await useCase.execute({ productDto })

    return http.send(null, HTTP_STATUS_CODE.created)
  }
}
