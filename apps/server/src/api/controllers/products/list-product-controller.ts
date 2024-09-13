import { productsRepository } from '@/database/prisma/repositories'
import type { IHttp } from '@stocker/core/src/interfaces'
import { ListProductsUseCase } from '@stocker/core/src/use-cases'
import { HTTP_STATUS_CODE } from '@stocker/core/src/constants'

type RouteParams = {
    page: string
}

export class ListProductController {
    async handle(http: IHttp) {
        const { page } = http.getQueryParams<RouteParams>()
        const pageNumber = parseInt(page || '1', 10)

        const useCase = new ListProductsUseCase(productsRepository)
        const products = await useCase.execute({ page: pageNumber })

        return http.send(products, HTTP_STATUS_CODE.created)
    }
}
