import type { Category } from '@stocker/core/entities'
import type { ICategoriesRepository } from '@stocker/core/interfaces'
import { PrismaCategoriesMapper } from '../mappers'
import { PrismaError } from '../prisma-error'
import { prisma } from '../prisma-client'

export class PrismaCategoriesRepository implements ICategoriesRepository {
  private readonly mapper: PrismaCategoriesMapper = new PrismaCategoriesMapper()

  async add(category: Category): Promise<void> {
    try {
      const prismaCategory = this.mapper.toPrisma(category)

      await prisma.category.create({
        data: {
          id: prismaCategory.id,
          name: prismaCategory.name,
          parent_category_id: prismaCategory.parent_category_id,
          company_id: prismaCategory.company_id,
        },
      })
    } catch (error) {
      throw new PrismaError(error)
    }
  }
}
