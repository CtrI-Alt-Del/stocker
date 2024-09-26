import type { Batch, InventoryMovement } from '../../domain/entities'
import { InventoryMovementDto } from '../../dtos'
import type { ApiResponse, PaginationResponse } from '../../responses'
import type { InventoryMovementsListParams } from '../../types'

export interface IInventoryMovementsService {
  registerInboundMovement(
    inventoryMovemen: InventoryMovement,
    batch: Batch,
  ): Promise<ApiResponse<void>>
  registerOutbondMovement(
    inventoryMovemenDto: InventoryMovement,
  ): Promise<ApiResponse<void>>
  listInventoryMovements(
    params: InventoryMovementsListParams,
  ): Promise<ApiResponse<PaginationResponse<InventoryMovement>>>
  listManyInventoryMovement(params:InventoryMovementsListParams): Promise<ApiResponse<PaginationResponse<InventoryMovement>>>

}
