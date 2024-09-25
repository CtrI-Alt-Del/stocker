import type { BatchDto } from '@stocker/core/dtos'
import type { PrismaBatch } from '../types'
import { Batch } from '@stocker/core/entities'

export class PrismaBatchesMapper {
  toDomain(prismaBatch: PrismaBatch): Batch {
    const dto: BatchDto = {
      id: prismaBatch.id,
      code: prismaBatch.code,
      itemsCount: prismaBatch.items_count,
      productId: prismaBatch.product_id,
    }

    if (prismaBatch.expiration_date) dto.expirationDate = prismaBatch.expiration_date
    
    if (prismaBatch.maximumDaysToExpiration) dto.maximumDaysToExpiration = prismaBatch.maximumDaysToExpiration

    return Batch.create(dto)
  }

  toPrisma(batch: Batch): PrismaBatch {
    const batchDto = batch.dto

    return {
      id: batch.id,
      code: batchDto.code,
      items_count: batchDto.itemsCount,
      product_id: batchDto.productId,
      expiration_date: batchDto.expirationDate ?? null,
      maximumDaysToExpiration: batchDto.maximumDaysToExpiration ?? null,
      registered_at: batch.registeredAt,
    }
  }
}
