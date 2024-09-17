import { batchRepository, inventorymovementRepository } from "@/database";
import { HTTP_STATUS_CODE } from "@stocker/core/constants";
import { BatchDto, InventoryMovementDto } from "@stocker/core/dtos";
import { IHttp } from "@stocker/core/interfaces";
import { RegisterInboundInventoryMovementUseCase } from "@stocker/core/use-cases";


export class RegisterInboundInventoryMovementController {
  async handle(http: IHttp) {
    const batchDto = http.getBody<BatchDto>()
    const inventoryMovementDto = http.getBody<InventoryMovementDto>()
    const useCase = new RegisterInboundInventoryMovementUseCase(batchRepository, inventorymovementRepository)
    const inventoryMovement = await useCase.execute({ batchDto, inventoryMovementDto })

    return http.send(null, HTTP_STATUS_CODE.created)
  }
}
