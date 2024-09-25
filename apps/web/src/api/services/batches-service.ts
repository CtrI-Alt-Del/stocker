import type { BatchDto } from '@stocker/core/dtos'
import type { IApiClient, IBatchesService } from '@stocker/core/interfaces'

export const BatchesService = (apiClient: IApiClient): IBatchesService => {
  return {
    async updateBatch(batchDto: Partial<BatchDto>, batchId: string) {
      return await apiClient.put(`/batches/${batchId}`, batchDto)
    },

    async deleteBatches(batchesIds: string[]) {
      return await apiClient.delete('/batches', { batchesIds })
    },
  }
}
