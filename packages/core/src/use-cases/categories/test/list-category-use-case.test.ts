import { beforeEach, describe, expect, it } from 'vitest'
import { CategoriesRepositoryMock } from '../../../../__tests__/mocks/repositories'
import { CategoriesFaker } from '../../../../__tests__/fakers'
import { ListCategoryUseCase } from '../list-category-use-case'
import { PAGINATION } from '../../../constants'
import type { Category } from '../../../domain/entities'

let useCase: ListCategoryUseCase
let categoriesRepository: CategoriesRepositoryMock
let fakeCategories: Category[] = []

describe('List categories use case', () => {
  beforeEach(async () => {
    categoriesRepository = new CategoriesRepositoryMock()

    fakeCategories = CategoriesFaker.fakeMany(20)
    for (const fakeCategory of fakeCategories) {
      await categoriesRepository.add(fakeCategory)
    }

    useCase = new ListCategoryUseCase(categoriesRepository)
  })

  it(`should list ${PAGINATION.itemsPerPage} categories per page`, async () => {
    let pagination = await useCase.execute({ page: 1 })
    expect(pagination.items).toHaveLength(PAGINATION.itemsPerPage)

    pagination = await useCase.execute({ page: 2 })
    expect(pagination.items).toHaveLength(PAGINATION.itemsPerPage)
  })

  it('should return the count of categories', async () => {
    const pagination = await useCase.execute({ page: 1 })
    expect(pagination.itemsCount).toBe(fakeCategories.length)
  })

  it('should list the categories according to the current page', async () => {
    let pagination = await useCase.execute({ page: 1 })

    expect(pagination.items).toEqual(
      fakeCategories.slice(0, PAGINATION.itemsPerPage).map((category) => category.dto),
    )

    pagination = await useCase.execute({ page: 2 })

    expect(pagination.items).toEqual(
      fakeCategories.slice(PAGINATION.itemsPerPage, 2 * PAGINATION.itemsPerPage).map((category) => category.dto),
    )
  })
})
