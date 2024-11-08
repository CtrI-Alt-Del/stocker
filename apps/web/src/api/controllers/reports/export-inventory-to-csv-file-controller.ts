import { HTTP_STATUS_CODE } from '@stocker/core/constants'
import type { IHttp, IReportsService } from '@stocker/core/interfaces'

export const ExportInventoryToCsvFileController = (reportsService: IReportsService) => {
  return {
    async handle(http: IHttp) {
      const response = await reportsService.exportInventoryToCsvFile()

      if (response.isFailure) {
        return response.throwError()
      }

      const csvBuffer = response.body

      return http.sendFile(csvBuffer, 'inventario.csv', 'csv', HTTP_STATUS_CODE.ok)
    },
  }
}
