import type { CategoryDto } from '../../dtos/category-dto'
import { Entity } from '../abstracts'

type CategoryProps = {
  name: string
  parentCategoryId?: string
  companyId: string
  subCategories: Category[]
}

export class Category extends Entity<CategoryProps> {
  static create(dto: CategoryDto): Category {
    return new Category(
      {
        name: dto.name,
        parentCategoryId: dto.parentCategoryId,
        companyId: dto.companyId,
        subCategories: dto.subCategories.map(Category.create),
      },
      dto.id,
    )
  }

  appendSubcategory(category: Category) {
    this.subCategories.push(category)
  }

  get hasParentCategory(): boolean {
    return Boolean(this.props.parentCategoryId)
  }

  get name(): string {
    return this.props.name
  }

  get subCategories(): Category[] {
    return this.props.subCategories
  }

  get dto(): CategoryDto {
    return {
      id: this.id,
      name: this.name,
      parentCategoryId: this.props.parentCategoryId,
      companyId: this.props.companyId,
      subCategories: this.props.subCategories.map((subCategory) => subCategory.dto),
    }
  }

  update(partialDto: Partial<CategoryDto>): Category {
    return Category.create({ ...this.dto, ...partialDto })
  }
}
