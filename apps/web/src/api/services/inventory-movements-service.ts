import type { InventoryMovementDto } from '@stocker/core/dtos'
import type { InventoryMovement, Batch } from '@stocker/core/entities'
import type { IApiClient, IInventoryMovementsService } from '@stocker/core/interfaces'
import type { PaginationResponse } from '@stocker/core/responses'

export const InventoryMovementsService = (
  apiClient: IApiClient,
): IInventoryMovementsService => {
  return {
    async registerInboundMovement(inventoryMovement: InventoryMovement, batch: Batch) {
      return await apiClient.post('/inventory-movements/inbound', {
        inventoryMovement: inventoryMovement.dto,
        batch: batch.dto,
      })
    },

    async registerOutbondMovement(movement: InventoryMovement) {
      return await apiClient.post('/inventory-movements/outbound', movement.dto)
    },

    async listInventoryMovements({ page, productId, movementType, responsibleId }) {
      apiClient.setParam('page', String(page))
      apiClient.setParam('productId', productId || '')
      apiClient.setParam('responsibleId', String(responsibleId))
      apiClient.setParam('movementType', String(movementType))
      return await apiClient.get<PaginationResponse<InventoryMovementDto>>(
        '/inventory-movements',
      )
    },
    async listManyInventoryMovement(page: number) {
      apiClient.setParam('page', String(page))
      return await apiClient.get<PaginationResponse<InventoryMovementDto>>(
        '/inventory-movements',
      )
    },
  }
}
