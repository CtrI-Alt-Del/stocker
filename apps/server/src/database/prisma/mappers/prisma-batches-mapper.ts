import type { PrismaBatch } from "../types";
import { Batch } from "@stocker/core/entities";

export class PrismaBatchesMapper {
    toDomain(prismaBatch: PrismaBatch): Batch {
        return Batch.create({
            id: prismaBatch.id,
            code: prismaBatch.code,
            itemsCount: prismaBatch.items_count,
            expirationDate: prismaBatch.expiration_date,
            productId: prismaBatch.product_id,
        });
    }

    toPrisma(batch: Batch): PrismaBatch {
        return {
            id: batch.id,
            code: batch.code,
            items_count: batch.itemsCount,
            expiration_date: batch.expirationDate,
            product_id: batch.id,
        };
    }
}