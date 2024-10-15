import { beforeEach, describe, expect, it } from 'vitest'

import { ProductsRepositoryMock } from '../../../../__tests__/mocks/repositories'
import { ProductsFaker } from '../../../../__tests__/fakers'
import { UpdateProductUseCase } from '../update-product-use-case'
import { NotFoundError } from '../../../errors'

let useCase: UpdateProductUseCase
let productsRepository: ProductsRepositoryMock

describe('Update product use case', () => {
  beforeEach(() => {
    productsRepository = new ProductsRepositoryMock()
    useCase = new UpdateProductUseCase(productsRepository)
  })

  it('should not update product if the product does not exist', async () => {
    const fakeProduct = ProductsFaker.fake()

    expect(async () => {
      await useCase.execute({ productDto: fakeProduct.dto, productId: fakeProduct.id })
    }).rejects.toThrowError(NotFoundError)
  })

  it('should update product', async () => {
    const fakeProduct = ProductsFaker.fake({
      name: 'original name',
      description: 'original description',
      code: 'original code',
    })
    await productsRepository.add(fakeProduct)

    expect(productsRepository.products[0]?.name).toEqual('original name')
    expect(productsRepository.products[0]?.description).toEqual('original description')
    expect(productsRepository.products[0]?.code).toEqual('original code')

    await useCase.execute({
      productDto: { name: 'updated name', description: 'updated description' },
      productId: fakeProduct.id,
    })

    expect(productsRepository.products[0]?.name).toEqual('updated name')
    expect(productsRepository.products[0]?.description).toEqual('updated description')
    expect(productsRepository.products[0]?.code).toEqual('original code')
  })
})
