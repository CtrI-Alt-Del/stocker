import { describe, expect, it } from 'vitest'

import { CategoriesRepositoryMock } from '../../../../__tests__/mocks/repositories'
import { CategoriesFaker } from '../../../../__tests__/fakers'
import { RegisterCategoryUseCase } from '../register-category-use-case'

describe('Register category use case', () => {
  it('should register a category', async () => {
    const categoriesRepository = new CategoriesRepositoryMock()
    const useCase = new RegisterCategoryUseCase(categoriesRepository)

    expect(categoriesRepository.categories).toHaveLength(0)

    const categoryDto = CategoriesFaker.fakeDto()
    await useCase.execute({ categoryDto })
    console.log('faker: ', categoryDto)
    console.log('result:', categoriesRepository.categories[0]?.dto)
    expect(categoriesRepository.categories).toHaveLength(1)
    expect(categoriesRepository.categories[0]?.dto).toEqual(categoryDto)
  })
})
