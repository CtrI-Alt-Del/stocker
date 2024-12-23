import type { BatchDto } from '@stocker/core/dtos'
import { Batch } from '@stocker/core/entities'

import type { PrismaBatch } from '../types'

export class PrismaBatchesMapper {
  toDomain(prismaBatch: PrismaBatch): Batch {
    const dto: BatchDto = {
      id: prismaBatch.id,
      code: prismaBatch.code,
      itemsCount: prismaBatch.items_count,
      productId: prismaBatch.product_id,
      registeredAt: prismaBatch.registered_at,
    }

    if (prismaBatch.expiration_date)
      dto.expirationDate = new Date(prismaBatch.expiration_date)

    if (prismaBatch.maximum_days_to_expiration)
      dto.maximumDaysToExpiration = prismaBatch.maximum_days_to_expiration

    return Batch.create(dto)
  }

  toPrisma(batch: Batch): PrismaBatch {
    const batchDto = batch.dto

    return {
      id: batch.id,
      code: batchDto.code,
      items_count: batchDto.itemsCount,
      product_id: batchDto.productId,
      expiration_date: batch.expirationDate ?? null,
      maximum_days_to_expiration: batchDto.maximumDaysToExpiration ?? null,
      registered_at: batch.registeredAt,
    }
  }
}
