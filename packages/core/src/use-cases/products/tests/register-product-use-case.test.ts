import { describe, expect, it } from 'vitest'

import { ProductsRepositoryMock } from '../../../../__tests__/mocks/repositories'
import { ProductsFaker } from '../../../../__tests__/fakers'
import { RegisterProductUseCase } from '../register-product-use-case'

describe('Register product use case', () => {
  it('should register a product', async () => {
    const productsRepository = new ProductsRepositoryMock()
    const useCase = new RegisterProductUseCase(productsRepository)

    expect(productsRepository.products).toHaveLength(0)

    const productDto = ProductsFaker.fakeDto()
    await useCase.execute({ productDto })

    expect(productsRepository.products).toHaveLength(1)
    expect(productsRepository.products[0]?.dto).toEqual(productDto)
  })
})
