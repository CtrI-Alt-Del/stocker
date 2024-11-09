import type { IHttp } from '@stocker/core/interfaces'
import type { InventoryMovementDto } from '@stocker/core/dtos'
import { RegisterOutboundInventoryMovementUseCase } from '@stocker/core/use-cases'
import {
  batchesRepository,
  inventoryMovementsRepository,
  productsRepository,
} from '@/database'
import { HTTP_STATUS_CODE } from '@stocker/core/constants'
import { queueProvider } from '@/providers'

export class RegisterOutboundInventoryMovementController {
  async handle(http: IHttp) {
    const body = http.getBody<InventoryMovementDto>()

    const useCase = new RegisterOutboundInventoryMovementUseCase(
      batchesRepository,
      productsRepository,
      inventoryMovementsRepository,
      queueProvider,
    )

    await useCase.execute({
      inventoryMovementDto: body,
    })

    return http.send(null, HTTP_STATUS_CODE.created)
  }
}
