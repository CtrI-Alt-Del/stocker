import { InventoryMovementDto } from "@stocker/core/dtos";
import { InventoryMovement } from "@stocker/core/entities";
import { IApiClient, IMovementService } from "@stocker/core/interfaces";
import { PaginationResponse } from "@stocker/core/responses";

export const MovementService = (apiClient: IApiClient):IMovementService =>{
  return {
    async registerInboundMovement(movement: InventoryMovement){
      return await apiClient.post('/inventory_movements/inbound',movement.dto)
    },
    async registerOutbondMovement(movement: InventoryMovement) {
      return await apiClient.post('/inventory_movements/outbound',movement.dto)
        
    },
    async listMovements({page ,productID }) {
      apiClient.setParam('page',String(page))
      return await apiClient.get<PaginationResponse<InventoryMovementDto>>(`/inventory_movements/${productID}`)
        
    },
  }
}
