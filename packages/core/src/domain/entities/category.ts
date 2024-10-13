import type { CategoryDto } from '../../dtos/category-dto'
import { Entity } from '../abstracts'

type CategoryProps = {
  name: string
  parentCategoryId?: string
  companyId: string
}

export class Category extends Entity<CategoryProps> {
  static create(dto: CategoryDto) {
    return new Category(
      {
        name: dto.name,
        parentCategoryId: dto.parentCategoryId,
        companyId: dto.companyId,
      },
      dto.id,
    )
  }

  get name(): string {
    return this.props.name
  }

  get dto() {
    return {
      id: this.id,
      name: this.name,
      parentCategoryId: this.props.parentCategoryId,
      companyId: this.props.companyId,
    }
  }
}
