import { beforeEach, describe, expect, it } from 'vitest'

import { ProductsRepositoryMock } from '../../../../__tests__/mocks/repositories'
import { ReportInventorysUseCase } from '../report-inventory-use-case'
import { PAGINATION } from '../../../constants'
import { ProductsFaker } from '../../../../__tests__/fakers'
import type { Product } from '../../../domain/entities'

let useCase: ReportInventorysUseCase
let productsRepository: ProductsRepositoryMock
let fakeProducts: Product[]

describe('Report weekly inventory movements use case', () => {
  beforeEach(async () => {
    productsRepository = new ProductsRepositoryMock()

    fakeProducts = ProductsFaker.fakeMany(20)
    for (const fakeProduct of fakeProducts) {
      await productsRepository.add(fakeProduct)
    }

    useCase = new ReportInventorysUseCase(productsRepository)
  })

  it(`should list ${PAGINATION.itemsPerPage} products with inventory movements per page`, async () => {
    const pagination = await useCase.execute({ page: 1, companyId: 'company-123' })

    expect(pagination.items).toEqual(
      fakeProducts.slice(0, 10).map((fakeProduct) => fakeProduct.dto),
    )
  })

  it(`should list ${PAGINATION.itemsPerPage} products with inventory movements per page`, async () => {
    const pagination = await useCase.execute({ page: 2, companyId: 'company-123' })

    expect(pagination.items).toEqual(
      fakeProducts.slice(10, 20).map((fakeProduct) => fakeProduct.dto),
    )
  })
})
