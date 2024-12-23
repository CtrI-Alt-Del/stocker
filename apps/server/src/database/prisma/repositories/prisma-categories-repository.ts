import type { Category } from '@stocker/core/entities'
import type { ICategoriesRepository } from '@stocker/core/interfaces'
import { PrismaCategoriesMapper } from '../mappers'
import { PrismaError } from '../prisma-error'
import { prisma } from '../prisma-client'
import type { CategoriesListParams } from '@stocker/core/types'
import { PAGINATION } from '@stocker/core/constants'

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

  async addMany(categories: Category[]): Promise<void> {
    try {
      const prismaCategories = categories.map(this.mapper.toPrisma)

      await prisma.category.createMany({
        data: prismaCategories.map((prismaCategory) => ({
          id: prismaCategory.id,
          name: prismaCategory.name,
          parent_category_id: prismaCategory.parent_category_id,
          company_id: prismaCategory.company_id,
        })),
      })
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async findById(categoryId: string): Promise<Category | null> {
    try {
      const prismaCategory = await prisma.category.findUnique({
        where: { id: categoryId },
        include: {
          subCategories: true,
        },
      })

      if (!prismaCategory) return null

      return this.mapper.toDomain(prismaCategory)
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async findMany({
    page,
    companyId,
    name,
  }: CategoriesListParams): Promise<{ categories: Category[]; count: number }> {
    try {
      const prismaCategories = await prisma.category.findMany({
        take: PAGINATION.itemsPerPage,
        skip: page > 0 ? (page - 1) * PAGINATION.itemsPerPage : 0,
        include: {
          subCategories: true,
        },
        where: {
          parent_category_id: null,
          company_id: companyId,
          name: name
            ? {
                contains: name,
                mode: 'insensitive',
              }
            : undefined,
        },
        orderBy: { registered_at: 'desc' },
      })

      const count = await prisma.category.count({
        where: {
          parent_category_id: null,
          company_id: companyId,
          name: name
            ? {
                contains: name,
                mode: 'insensitive',
              }
            : undefined,
        },
      })

      return {
        categories: prismaCategories.map((category) => this.mapper.toDomain(category)),
        count,
      }
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async count(): Promise<number> {
    try {
      const count = await prisma.category.count()
      return count
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async update(category: Category): Promise<void> {
    try {
      const prismaCategory = this.mapper.toPrisma(category)
      await prisma.category.update({
        data: {
          name: prismaCategory.name,
          parent_category_id: prismaCategory.parent_category_id,
          company_id: prismaCategory.company_id,
        },
        where: { id: prismaCategory.id },
      })
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async deleteById(categoryId: string): Promise<void> {
    try {
      const category = await prisma.category.findUnique({
        where: {
          id: categoryId,
        },
        include: {
          subCategories: true,
        },
      })

      if (!category) {
        throw new PrismaError('Repository Error: Category not found')
      }

      if (category.subCategories.length > 0) {
        const subCategoryIds = category.subCategories.map((subCategory) => subCategory.id)
        await prisma.category.deleteMany({
          where: {
            id: {
              in: subCategoryIds,
            },
          },
        })
      }

      await prisma.category.delete({
        where: {
          id: categoryId,
        },
      })
    } catch (error) {
      throw new PrismaError(error)
    }
  }
}
