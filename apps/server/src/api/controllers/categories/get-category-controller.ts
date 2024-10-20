import type { IHttp } from '@stocker/core/interfaces'
import { GetCategoryUseCase } from '@stocker/core/use-cases'

import { categoriesRepository } from '@/database'

type RouteParams = {
  categoryId: string
}

export class GetCategoryController {
  async handle(http: IHttp) {
    const { categoryId } = http.getRouteParams<RouteParams>()
    const useCase = new GetCategoryUseCase(categoriesRepository)
    const category = await useCase.execute(categoryId)
    return http.send(category)
  }
}
