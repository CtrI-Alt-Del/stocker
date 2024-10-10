import type { RegisterCategoryDTO } from '../../dtos/category-dto'
import { Entity } from '../abstracts'

type CategoryProps = {
  name: string
  parentCategoryId?: string
}

export class Category extends Entity<CategoryProps> {
  static create(dto: RegisterCategoryDTO) {
    return new Category(
      {
        name: dto.name,
        parentCategoryId: dto.parentCategoryId,
      },
      dto.id,
    )
  }
}
