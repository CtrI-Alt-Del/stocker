import type { IHttp } from '@stocker/core/interfaces'
import type { CategoryDto } from '@stocker/core/dtos'
import { RegisterCategoryUseCase } from '@stocker/core/use-cases'
import { HTTP_STATUS_CODE } from '@stocker/core/constants'

import { categoriesRepository } from '@/database'

export class RegisterCategoryController {
  async handle(http: IHttp) {
    const categoryDto = http.getBody<CategoryDto>()
    const useCase = new RegisterCategoryUseCase(categoriesRepository)
    const categoryId = await useCase.execute({ categoryDto })

    return http.send({ categoryId }, HTTP_STATUS_CODE.created)
  }
}
