import { beforeEach, describe, expect, it } from 'vitest'

import { CategoriesRepositoryMock } from '../../../../__tests__/mocks/repositories'
import { CategoriesFaker } from '../../../../__tests__/fakers'
import { UpdateCategoryUseCase } from '../update-category-use-case'
import { NotFoundError } from '../../../errors'

let useCase: UpdateCategoryUseCase
let categoriesRepository: CategoriesRepositoryMock

describe('Update category use case', () => {
  beforeEach(() => {
    categoriesRepository = new CategoriesRepositoryMock()
    useCase = new UpdateCategoryUseCase(categoriesRepository)
  })

  it('should not update category if the category does not exist', async () => {
    const fakeCategory = CategoriesFaker.fake()

    expect(async () => {
      await useCase.execute({ categoryDto: fakeCategory.dto, categoryId: fakeCategory.id })
    }).rejects.toThrowError(NotFoundError)
  })

  it('should update category', async () => {
    const fakeCategory = CategoriesFaker.fake({
      name: 'original name'
    })
    await categoriesRepository.add(fakeCategory)

    expect(categoriesRepository.categories[0]?.name).toEqual('original name')

    await useCase.execute({
      categoryDto: { name: 'updated name' },
      categoryId: fakeCategory.id,
    })

    expect(categoriesRepository.categories[0]?.name).toEqual('updated name')
  })
})
