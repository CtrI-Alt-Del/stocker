import { Category } from '@stocker/core/entities'
import type { PrismaCategory } from '../types'

export class PrismaCategoriesMapper {
  toDomain(prismaCategory: PrismaCategory): Category {
    const category = Category.create({
      id: prismaCategory.id,
      name: prismaCategory.name,
      parentCategoryId: prismaCategory.parent_category_id ?? undefined,
      companyId: prismaCategory.company_id,
      subCategories: [],
    })

    if (prismaCategory.subCategories) {
      category.subCategories = prismaCategory.subCategories.map((subCategory) =>
        this.toDomain(subCategory),
      )
    }

    return category
  }

  toPrisma(category: Category): PrismaCategory {
    const categoryDto = category.dto

    return {
      id: category.id,
      name: categoryDto.name,
      parent_category_id: categoryDto.parentCategoryId ?? null,
      company_id: categoryDto.companyId,
      registered_at: new Date(),
      subCategories: [],
    }
  }
}
