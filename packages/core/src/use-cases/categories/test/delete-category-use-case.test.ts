import { beforeEach, describe, expect, it } from 'vitest'
import { CategoriesRepositoryMock } from '../../../../__tests__/mocks/repositories'
import { NotFoundError } from '../../../errors'
import { CategoriesFaker } from '../../../../__tests__/fakers'
import { DeleteCategoryUseCase } from '../delete-category-use-case'

let useCase: DeleteCategoryUseCase
let categoriesRepository: CategoriesRepositoryMock

describe('Delete category use case', () => {
  beforeEach(() => {
    categoriesRepository = new CategoriesRepositoryMock()
    useCase = new DeleteCategoryUseCase(categoriesRepository)
  })

  it('should delete a category by its ID', async () => {
    const fakeCategory = CategoriesFaker.fake()

    await categoriesRepository.add(fakeCategory)

    expect(categoriesRepository.categories).toHaveLength(1)

    await useCase.execute({ categoryId: fakeCategory.id })

    expect(categoriesRepository.categories).toHaveLength(0)
  })

  it('should throw an error if category does not exist', async () => {
    const fakeCategory = CategoriesFaker.fake()

    expect(async () => {
      await useCase.execute({ categoryId: fakeCategory.id })
    }).rejects.toThrowError(NotFoundError)
  })

  it('should delete subcategories if parent category is deleted', async () => {
    const fakeParentCategory = CategoriesFaker.fake()
    await categoriesRepository.add(fakeParentCategory)
    if (fakeParentCategory.dto.subCategories[0] !== undefined) {
      await categoriesRepository.add(fakeParentCategory.dto.subCategories[0])
    }

    expect(categoriesRepository.categories).toHaveLength(2)

    await useCase.execute({ categoryId: fakeParentCategory.id })

    expect(categoriesRepository.categories).toHaveLength(0)
  })
})
