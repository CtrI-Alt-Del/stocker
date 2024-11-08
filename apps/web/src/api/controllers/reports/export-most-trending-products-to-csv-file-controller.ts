import { HTTP_STATUS_CODE } from '@stocker/core/constants'
import type { IHttp, IReportsService } from '@stocker/core/interfaces'

type QueryParams = {
  startDate: string
  endDate: string
  categoryId?: string
}

export const ExportMostTrendingProductsToCsvFileController = (reportsService: IReportsService) => {
  return {
    async handle(http: IHttp) {
      const { startDate, endDate, categoryId } = http.getQueryParams<QueryParams>()
      const response = await reportsService.exportMostTrendingProductsToCsvFile({ startDate: new Date(startDate), endDate: new Date(endDate), categoryId })

      if (response.isFailure) {
        return response.throwError()
      }

      const csvBuffer = response.body

      http.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      )
      http.setHeader(
        'Content-Disposition',
        'attachment; filename="produtos-de-maior-tendencia.xlsx"',
      )

      return http.send(csvBuffer, HTTP_STATUS_CODE.ok)
    },
  }
}
