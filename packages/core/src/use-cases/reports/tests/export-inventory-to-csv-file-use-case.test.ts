import { beforeEach, describe, expect, it } from 'vitest'

import { ProductsRepositoryMock } from '../../../../__tests__/mocks/repositories'
import { CsvProviderMock } from '../../../../__tests__/mocks/providers'
import { ExportInventoryToCsvFileUseCase } from '../export-inventory-to-csv-file-use-case'
import { INVENTORY_CSV_FILE_COLUMNS } from '../../../constants'
import { ProductsFaker } from '../../../../__tests__/fakers'
import type { Product } from '../../../domain/entities'

let useCase: ExportInventoryToCsvFileUseCase
let productsRepository: ProductsRepositoryMock
let csvProviderMock: CsvProviderMock
let fakeProducts: Product[] = []

describe('Export inventory to csv file use case', () => {
  beforeEach(async () => {
    productsRepository = new ProductsRepositoryMock()

    fakeProducts = ProductsFaker.fakeMany(20)
    for (const fakeProduct of fakeProducts) {
      await productsRepository.add(fakeProduct)
    }

    csvProviderMock = new CsvProviderMock()
    useCase = new ExportInventoryToCsvFileUseCase(productsRepository, csvProviderMock)
  })

  it('should return the buffer of the csv file containing the products', async () => {
    const fileBuffer = await useCase.execute({
      companyId: '',
      categoryId: '',
      locationId: '',
      supplierId: '',
      productName: '',
      stockLevel: 'average',
    })
    expect(fileBuffer).toEqual(
      Buffer.from(
        [
          INVENTORY_CSV_FILE_COLUMNS,
          fakeProducts.map((fakeProduct) => ({
            name: fakeProduct.name,
            batchQuantity: fakeProduct.batchesCount,
            entryTransactions: fakeProduct.inboundInventoryMovementsCount,
            exitTransactions: fakeProduct.outboundInventoryMovementsCount,
            currentStock: fakeProduct.currentStock,
            minimumStock: fakeProduct.minimumStock,
          })),
        ].toString(),
      ),
    )
  })
})
