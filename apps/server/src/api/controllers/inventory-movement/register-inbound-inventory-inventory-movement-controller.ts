import type { IHttp } from '@stocker/core/interfaces'
import { BatchDto, InventoryMovementDto } from '@stocker/core/dtos'
import { RegisterInboundInventoryMovementUseCase } from '@stocker/core/use-cases'


export class RegisterInboundInventoryMovementController {
  async handle(http: IHttp) {
    const batchDto = http.getBody<BatchDto>()
    const inventoryDto = http.getBody<InventoryMovementDto>()
    const useCase = new RegisterInboundInventoryMovementUseCase()

  }
}
