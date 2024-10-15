import { describe, expect, it } from 'vitest'
import { ReportStockLevelUseCase } from '../report-stock-level-use-case'
import { ProductsRepositoryMock } from '../../../../__tests__/mocks/repositories'

describe('Report sotck level use case', () => {
  it('should return the count of products with safe, average and danger level stock', async () => {
    const productsRepository = new ProductsRepositoryMock()

    productsRepository.countSafeStockLevel = async () => 100
    productsRepository.countAverageStockLevel = async () => 50
    productsRepository.countDangerStockLevel = async () => 10

    const useCase = new ReportStockLevelUseCase(productsRepository)

    const stockLevel = await useCase.execute()
    expect(stockLevel.safe).toBe(100)
    expect(stockLevel.average).toBe(50)
    expect(stockLevel.danger).toBe(10)
  })
})
