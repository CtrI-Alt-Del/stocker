// import type { IHttp } from '@stocker/core/interfaces'
// import { DeleteProductUseCase } from '@stocker/core/use-cases'

// type RouteParams = {
//     productId: string
// }

// export class DeleteProductController {
//   async handle(http: IHttp) {
//     const { productId } = http.getRouteParams<RouteParams>()
//     const useCase = new DeleteProductUseCase()
//     await useCase.execute({
//         productId
//     })
//     return http.send(null)
//   }
// }
