import type { IHttp } from '@stocker/core/interfaces'
import type { BatchDto, InventoryMovementDto } from '@stocker/core/dtos'
import { RegisterOutboundInventoryMovementUseCase } from '@stocker/core/use-cases'
import {
  batchRepository,
  inventorymovementRepository,
  productsRepository,
} from '@/database'
import { HTTP_STATUS_CODE } from '@stocker/core/constants'

export class RegisterOutboundInventoryMovementController {
  async handle(http: IHttp) {
    const body = http.getBody<InventoryMovementDto>()
    const useCase = new RegisterOutboundInventoryMovementUseCase(
      batchRepository,
      productsRepository,
      inventorymovementRepository,
    )

    await useCase.execute({
      inventoryMovementDto: body,
    })

    return http.send(null, HTTP_STATUS_CODE.created)
  }
}
