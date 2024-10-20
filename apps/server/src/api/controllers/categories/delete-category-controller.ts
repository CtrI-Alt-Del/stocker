import type { IHttp } from '@stocker/core/interfaces'
import { DeleteCategoryUseCase } from '@stocker/core/use-cases'

import { categoriesRepository } from '@/database'

type RouteParams = {
  categoryId: string
}

export class DeleteCategoryController {
  async handle(http: IHttp) {
    const { categoryId } = http.getRouteParams<RouteParams>()
    const useCase = new DeleteCategoryUseCase(categoriesRepository)
    await useCase.execute({
      categoryId,
    })
    return http.send(null)
  }
}
