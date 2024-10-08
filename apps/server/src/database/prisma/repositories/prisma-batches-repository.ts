import type { Batch } from '@stocker/core/entities'
import type { IBatchesRepository } from '@stocker/core/interfaces'
import { PrismaBatchesMapper } from '../mappers'

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
    throw new Error('Method not implemented.')
  }

  async countItems(): Promise<number> {
    throw new Error('Method not implemented.')
  }
}
