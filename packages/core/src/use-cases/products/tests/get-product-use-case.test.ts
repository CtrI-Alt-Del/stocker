import { beforeEach, describe, expect, it } from 'vitest'
import { GetProductUseCase } from '../get-product-use-case'
import { ProductsRepositoryMock } from '../../../../__tests__/mocks/repositories'
import { NotFoundError } from '../../../errors'
import { ProductsFaker } from '../../../../__tests__/fakers'

let useCase: GetProductUseCase
let productsRepository: ProductsRepositoryMock

describe('Get product use case', () => {
  beforeEach(() => {
    productsRepository = new ProductsRepositoryMock()
    useCase = new GetProductUseCase(productsRepository)
  })

  it('should not get product if the product does not exist', async () => {
    const fakeProduct = ProductsFaker.fake()

    expect(async () => {
      await useCase.execute({ productId: fakeProduct.id })
    }).rejects.toThrowError(NotFoundError)
  })

  it('should not get product', async () => {
    const fakeProduct = ProductsFaker.fake()
    await productsRepository.add(fakeProduct)

    const product = await useCase.execute({ productId: fakeProduct.id })

    expect(product).toEqual(fakeProduct.dto)
  })
})
