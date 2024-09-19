import { HTTP_STATUS_CODE } from '@stocker/core/constants'
import type { BatchDto, InventoryMovementDto } from '@stocker/core/dtos'
import type { IHttp } from '@stocker/core/interfaces'
import { RegisterInboundInventoryMovementUseCase } from '@stocker/core/use-cases'
import { batchRepository, inventorymovementRepository } from '@/database'

type Body = {
  batch: BatchDto
  inventoryMovement: InventoryMovementDto
}

export class RegisterInboundInventoryMovementController {
  async handle(http: IHttp) {
    const body = http.getBody<Body>()
    const useCase = new RegisterInboundInventoryMovementUseCase(
      batchRepository,
      inventorymovementRepository,
    )
    await useCase.execute({
      batchDto: body.batch,
      inventoryMovementDto: body.inventoryMovement,
    })

    return http.send(null, HTTP_STATUS_CODE.created)
  }
}
