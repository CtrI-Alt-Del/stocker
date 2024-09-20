import { InventoryMovementDto } from "../../dtos";
import { ApiResponse, PaginationResponse } from "../../responses";
import { InventoryMovementsListParams } from "../../types";

export interface IMovementService{
  registerInboundMovement(inventoryMovemenDto: InventoryMovementDto): Promise<ApiResponse<void>>
  registerOutbondMovement(inventoryMovemenDto: InventoryMovementDto): Promise<ApiResponse<void>>
  listMovements(params:InventoryMovementsListParams): Promise<ApiResponse<PaginationResponse<InventoryMovementDto>>>
}
