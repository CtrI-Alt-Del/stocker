import { batchRepository, inventorymovementRepository } from "@/database";
import { HTTP_STATUS_CODE } from "@stocker/core/constants";
import { BatchDto, InventoryMovementDto } from "@stocker/core/dtos";
import { IHttp } from "@stocker/core/interfaces";
import { RegisterInboundInventoryMovementUseCase } from "@stocker/core/use-cases";

type Body = {
  batch: BatchDto
  inventoryMovement: InventoryMovementDto
}

export class RegisterInboundInventoryMovementController {
  async handle(http: IHttp) {
    const body = http.getBody<Body>()
    const useCase = new RegisterInboundInventoryMovementUseCase(batchRepository, inventorymovementRepository)
    const inventoryMovement = await useCase.execute({ batchDto, inventoryMovementDto })

    return http.send(null, HTTP_STATUS_CODE.created)
  }
}
