import type { Batch, InventoryMovement } from '../../domain/entities'
import type { InventoryMovementDto } from '../../dtos'
import type { ApiResponse, PaginationResponse } from '../../responses'
import type { InventoryMovementsListParams } from '../../types'

export interface IInventoryMovementsService {
  registerInboundMovement(
    inventoryMovement: InventoryMovement,
    batch: Batch,
  ): Promise<ApiResponse<void>>
  registerOutbondMovement(
    inventoryMovement: InventoryMovement,
  ): Promise<ApiResponse<void>>
  listInventoryMovements(
    params: InventoryMovementsListParams,
  ): Promise<ApiResponse<PaginationResponse<InventoryMovementDto>>>
}
