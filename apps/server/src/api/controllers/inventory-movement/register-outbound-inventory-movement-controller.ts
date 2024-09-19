import type { IHttp } from '@stocker/core/interfaces'
import type { BatchDto, InventoryMovementDto } from '@stocker/core/dtos'
import { RegisterOutboundInventoryMovementUseCase } from '@stocker/core/use-cases'
import {
  batchRepository,
  productsRepository,
  inventorymovementRepository,
} from '@/database'
import { HTTP_STATUS_CODE } from '@stocker/core/constants'

type Body = {
  batch: BatchDto
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

    await useCase.execute({
      batchDto: body.batch,
      inventoryMovementDto: body.inventoryMovement,
    })

    return http.send(null, HTTP_STATUS_CODE.created)
  }
}
