import { beforeEach, describe, expect, it } from 'vitest'
import { ProductsRepositoryMock } from '../../../../__tests__/mocks/repositories'
import { ProductsFaker } from '../../../../__tests__/fakers'
import { ListProductsUseCase } from '../list-products-use-case'

let useCase: ListProductsUseCase
let productsRepository: ProductsRepositoryMock

describe('List products use case', () => {
  beforeEach(async () => {
    productsRepository = new ProductsRepositoryMock()

    const fakeProducts = ProductsFaker.fakeMany(20)
    for (const fakeProduct of fakeProducts) {
      await productsRepository.add(fakeProduct)
    }

    useCase = new ListProductsUseCase(productsRepository)
  })

  it('should list 10 products per page', async () => {
    const pagination = await useCase.execute({ page: 1 })

    expect(pagination.itemsCount).toBe(20)
    expect(pagination.items).toHaveLength(10)
  })

  it('should list products according to the current page', async () => {
    let pagination = await useCase.execute({ page: 1 })

    expect(pagination.items).toEqual(
      productsRepository.products.slice(0, 10).map((product) => product.dto),
    )

    pagination = await useCase.execute({ page: 2 })

    expect(pagination.items).toEqual(
      productsRepository.products.slice(10, 20).map((product) => product.dto),
    )
  })
})
