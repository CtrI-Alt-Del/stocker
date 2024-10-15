import { beforeEach, describe, expect, it } from 'vitest'

import { ProductsRepositoryMock } from '../../../../__tests__/mocks/repositories'
import { NotFoundError } from '../../../errors'
import { ProductsFaker } from '../../../../__tests__/fakers'
import { DeleteProductsUseCase } from '../delete-products-use-case'
import { FileStorageProviderMock } from '../../../../__tests__/mocks/providers'

let useCase: DeleteProductsUseCase
let productsRepository: ProductsRepositoryMock
let fileStorageProvider: FileStorageProviderMock

describe('Delete products use case', () => {
  beforeEach(() => {
    productsRepository = new ProductsRepositoryMock()
    fileStorageProvider = new FileStorageProviderMock()
    useCase = new DeleteProductsUseCase(productsRepository, fileStorageProvider)
  })

  it('should delete many products at once', async () => {
    const fakeProducts = ProductsFaker.fakeMany(5)

    for (const fakeProduct of fakeProducts) {
      await productsRepository.add(fakeProduct)
    }

    expect(productsRepository.products).toHaveLength(5)

    await useCase.execute({
      productsIds: fakeProducts.map((fakeProduct) => fakeProduct.id),
    })

    expect(productsRepository.products).toHaveLength(0)
  })

  it('should delete products that does not exist', async () => {
    const fakeProducts = ProductsFaker.fakeMany(5)

    for (const fakeProduct of fakeProducts) {
      await productsRepository.add(fakeProduct)
    }

    expect(async () => {
      await useCase.execute({
        productsIds: [
          ...fakeProducts.map((fakeProduct) => fakeProduct.id),
          ProductsFaker.fake().id,
        ],
      })
    }).rejects.toThrowError(NotFoundError)
  })
})
