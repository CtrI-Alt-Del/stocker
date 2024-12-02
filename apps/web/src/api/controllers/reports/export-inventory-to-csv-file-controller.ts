import { HTTP_STATUS_CODE } from '@stocker/core/constants'
import type { IHttp, IReportsService } from '@stocker/core/interfaces'
import type { StockLevel } from '@stocker/core/types'

type QueryParams = {
  productName?: string
  locationId?: string
  categoryId?: string
  stockLevel?: StockLevel
  supplierId?: string
}

export const ExportInventoryToCsvFileController = (reportsService: IReportsService) => {
  return {
    async handle(http: IHttp) {
      const { productName, locationId, categoryId, stockLevel, supplierId } =
        http.getQueryParams<QueryParams>()

      const response = await reportsService.exportInventoryToCsvFile({
        productName,
        locationId,
        categoryId,
        stockLevel,
        supplierId,
      })

      if (response.isFailure) {
        return response.throwError()
      }

      const csvBuffer = response.body

      return http.sendFile(csvBuffer, 'inventario.csv', 'csv', HTTP_STATUS_CODE.ok)
    },
  }
}
