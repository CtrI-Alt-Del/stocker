import type { IHttp } from '@stocker/core/interfaces'
import { DeleteCategoryUseCase } from '@stocker/core/use-cases'

import { categoriesRepository } from '@/database'

type Params = {
    categoryIds: string[]
}

export class DeleteCategoyController {
  async handle(http: IHttp) {
    const { categoryIds } = http.getQueryParams<Params>()

    const useCase = new DeleteCategoryUseCase(categoriesRepository)
    await useCase.execute({
        categoryIds,
    })
    return http.send(null)
  }
}
