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

  async findManyNearToExpire(): Promise<{ batches: Batch; companyId: string }[]> {
    try {
      const prismaBatches: (PrismaBatch & { company_id: string })[] =
        await prisma.$queryRaw`
        SELECT 
          B.*, 
          P.company_id
        FROM 
          batches B
        JOIN 
          products P
        ON 
          P.id = batches.P
        WHERE 
          B.expiration_date >= B.maximum_days_to_expiration
      `

      return prismaBatches.map((batch) => {
        const domainBatch = this.mapper.toDomain(batch)
        return { batches: domainBatch, companyId: batch.company_id }
      })
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

  async count(): Promise<number> {
    try {
      return prisma.batch.count()
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async countItems(): Promise<number> {
    try {
      const result = await prisma.batch.groupBy({
        by: ['id'],
        _sum: {
          items_count: true,
        },
      })
      return result.reduce((sum, item) => sum + (item._sum.items_count || 0), 0)
    } catch (error) {
      throw new PrismaError(error)
    }
  }
}
