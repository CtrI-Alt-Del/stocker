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

  async count(): Promise<number> {
    try {
      return await prisma.batch.count()
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async findById(productId: string): Promise<Batch | null> {
    try {
      const prismaBatch = await prisma.batch.findUnique({
        where: {
          id: productId,
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
      const updates = batches.map((batch) => {
        const prismaBatch = this.mapper.toPrisma(batch)
        return prisma.batch.update({
          where: { id: prismaBatch.id },
          data: { items_count: prismaBatch.items_count },
        })
      })
      await Promise.all(updates)
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
}
