import type { BatchDto } from '../../dtos'
import type { ApiResponse } from '../../responses'

export interface IBatchesService {
  updateBatch(batchDto: Partial<BatchDto>, batchId: string): Promise<ApiResponse<void>>
  deleteBatches(batchesIds: string[]): Promise<ApiResponse<void>>
}
