import type { CategoryDto } from "@stocker/core/dtos";
import type { IHttp } from "@stocker/core/interfaces";

import { categoriesRepository } from "@/database";
import { UpdateCategoryUseCase } from "@stocker/core/use-cases";
import { HTTP_STATUS_CODE } from "@stocker/core/constants";

type RouteParams = {
    categoryId: string
  }

export class UpdateCategoryController {
    async handle(http: IHttp) {
        const { categoryId } = http.getRouteParams<RouteParams>()
        const categoryDto = http.getBody<Partial<CategoryDto>>()

        const useCase = new UpdateCategoryUseCase(categoriesRepository)
        await useCase.execute({ categoryId, categoryDto })

        return http.send(null, HTTP_STATUS_CODE.ok)
    }
}