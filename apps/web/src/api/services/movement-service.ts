import { InventoryMovement } from "@stocker/core/entities";
import { IApiClient, IMovementService } from "@stocker/core/interfaces";

export const MovementService = (apiClient: IApiClient):IMovementService =>{
  return {
    async registerInboundMovement(movement: InventoryMovement){
      return await apiClient.post('/inventory_movements/inbound',movement.dto)
    },
    async registerOutbondMovement(inventoryMovemenDto) {
        
    },
    async listMovements(params) {
        
    },
  }
}
