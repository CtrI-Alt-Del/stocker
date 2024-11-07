import type { Batch } from '@stocker/core/entities'
import type { IBatchesRepository } from '@stocker/core/interfaces'
import { PrismaBatchesMapper } from '../mappers'
import type { PrismaBatch } from '../types'

import { prisma } from '../prisma-client'
import { PrismaError } from '../prisma-error'

export class PrismaBatchesRepository implements IBatchesRepository {
  private readonly mapper: PrismaBatchesMapper = new PrismaBatchesMapper()

  async add(batch: Batch): Promise<void> {
    try {
      const prismaBatch = this.mapper.toPrisma(batch)
      await prisma.batch.create({
        data: prismaBatch,
      })
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async findById(batchId: string): Promise<Batch | null> {
    try {
      const prismaBatch = await prisma.batch.findUnique({
        where: {
          id: batchId,
        },
      })
      return prismaBatch ? this.mapper.toDomain(prismaBatch) : null
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async findManyNearToExpire(): Promise<Array<{ companyId: string; batches: Batch[] }>> {
    try {
      const prismaBatches: Array<{ company_id: string; batches: PrismaBatch[] }> =
        await prisma.$queryRaw`
        SELECT 
          P.company_id,
          ARRAY_AGG(
            JSON_BUILD_OBJECT(
              'id', B.id,
              'code', B.code,
              'expiration_date', B.expiration_date,
              'items_count', B.items_count,
              'product_id', B.product_id,
              'registered_at', B.registered_at
              )
            ) batches
        FROM 
          batches B
        JOIN 
          products P
        ON 
          P.id = B.product_id
        WHERE 
          B.expiration_date IS NOT NULL AND 
          EXTRACT(DAY FROM B.expiration_date - INTERVAL '1 DAY' - CURRENT_DATE) < B.maximum_days_to_expiration
        GROUP BY P.company_id
      `

      return prismaBatches.map(({ company_id, batches }) => ({
        companyId: company_id,
        batches: batches.map(this.mapper.toDomain),
      }))
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async update(batch: Batch): Promise<void> {
    try {
      const prismaBatch = this.mapper.toPrisma(batch)

      await prisma.batch.update({
        data: {
          code: prismaBatch.code,
          items_count: prismaBatch.items_count,
          expiration_date: prismaBatch.expiration_date,
          maximum_days_to_expiration: prismaBatch.maximum_days_to_expiration,
        },
        where: {
          id: batch.id,
        },
      })
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async updateManyItemsCount(batches: Batch[]): Promise<void> {
    try {
      for (const batch of batches) {
        const prismaBatch = this.mapper.toPrisma(batch)
        await prisma.batch.update({
          where: {
            id: prismaBatch.id,
          },
          data: {
            items_count: prismaBatch.items_count,
          },
        })
      }
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async deleteMany(batchesIds: string[]): Promise<void> {
    try {
      await prisma.batch.deleteMany({
        where: {
          id: {
            in: batchesIds,
          },
        },
      })
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async count(companyId: string): Promise<number> {
    try {
      return prisma.batch.count({
        where: {
          Product: {
            company_id: companyId,
          },
        },
      })
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async countItems(companyId: string): Promise<number> {
    try {
      const result = await prisma.batch.groupBy({
        by: ['id'],
        _sum: {
          items_count: true,
        },
        where: {
          Product: {
            company_id: companyId,
          },
        },
      })
      return result.reduce((sum, item) => sum + (item._sum.items_count || 0), 0)
    } catch (error) {
      throw new PrismaError(error)
    }
  }
}
