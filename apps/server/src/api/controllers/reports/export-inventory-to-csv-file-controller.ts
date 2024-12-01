import { HTTP_STATUS_CODE } from '@stocker/core/constants'
import { CsvProvider } from '@/providers/csv-provider'
import { ExportInventoryToCsvFileUseCase } from '@stocker/core/use-cases'
import { productsRepository } from '@/database'
import type { IHttp } from '@stocker/core/interfaces'
import type { StockLevel } from '@stocker/core/types'

type QueryParams = {
  productName?: string
  locationId?: string
  categoryId?: string
  stockLevel?: StockLevel
  supplierId?: string
}

export class ExportInventoryToCsvFileController {
  async handle(http: IHttp) {
    const { productName, locationId, categoryId, stockLevel, supplierId } =
      http.getQueryParams<QueryParams>()
    const { companyId } = await http.getUser()

    const csvProvider = new CsvProvider()
    const useCase = new ExportInventoryToCsvFileUseCase(productsRepository, csvProvider)
    const csvBuffer = await useCase.execute({
      productName,
      locationId,
      categoryId,
      stockLevel,
      supplierId,
      companyId,
    })

    return http.send(csvBuffer, HTTP_STATUS_CODE.ok)
  }
}
