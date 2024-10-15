import { beforeEach, describe, expect, it } from 'vitest'
import { ProductsRepositoryMock } from '../../../../__tests__/mocks/repositories'
import { ProductsFaker } from '../../../../__tests__/fakers'
import { ListProductsUseCase } from '../list-products-use-case'
import { PAGINATION } from '../../../constants'
import type { Product } from '../../../domain/entities'

let useCase: ListProductsUseCase
let productsRepository: ProductsRepositoryMock
let fakeProducts: Product[] = []

describe('List products use case', () => {
  beforeEach(async () => {
    productsRepository = new ProductsRepositoryMock()

    fakeProducts = ProductsFaker.fakeMany(20)
    for (const fakeProduct of fakeProducts) {
      await productsRepository.add(fakeProduct)
    }

    useCase = new ListProductsUseCase(productsRepository)
  })

  it(`should list ${PAGINATION.itemsPerPage} products per page`, async () => {
    let pagination = await useCase.execute({ page: 1 })
    expect(pagination.items).toHaveLength(PAGINATION.itemsPerPage)

    pagination = await useCase.execute({ page: 2 })
    expect(pagination.items).toHaveLength(PAGINATION.itemsPerPage)
  })

  it('should return the count of products', async () => {
    const pagination = await useCase.execute({ page: 1 })
    expect(pagination.itemsCount).toBe(fakeProducts.length)
  })

  it('should list the products according to the current page', async () => {
    let pagination = await useCase.execute({ page: 1 })

    expect(pagination.items).toEqual(
      fakeProducts.slice(0, 10).map((product) => product.dto),
    )

    pagination = await useCase.execute({ page: 2 })

    expect(pagination.items).toEqual(
      fakeProducts.slice(10, 20).map((product) => product.dto),
    )
  })
})
