import type { IHttp } from '@stocker/core/interfaces'
import type { BatchDto, InventoryMovementDto } from '@stocker/core/dtos'
import { RegisterOutboundInventoryMovementUseCase } from '@stocker/core/use-cases'
import {
  batchRepository,
  type ProductsRepository,
  inventorymovementRepository,
} from '@/database'
import { HTTP_STATUS_CODE } from '@stocker/core/constants'

type Body = {
  batch: BatchDto
  productsRepository: ProductsRepository
  inventoryMovement: InventoryMovementDto
}

export class RegisterOutboundInventoryMovementController {
  async handle(http: IHttp) {
    const body = http.getBody<Body>()
    const useCase = new RegisterOutboundInventoryMovementUseCase(
      batchRepository,
      productsRepository,
      inventorymovementRepository,
    )

    await useCase.execute({ batchDto, inventoryMovementDto })

    return http.send(null, HTTP_STATUS_CODE.created)
  }
}
