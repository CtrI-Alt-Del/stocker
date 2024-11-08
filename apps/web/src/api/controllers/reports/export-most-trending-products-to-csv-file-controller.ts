import { HTTP_STATUS_CODE } from '@stocker/core/constants'
import type { IHttp, IReportsService } from '@stocker/core/interfaces'

type QueryParams = {
  startDate: string
  endDate: string
  categoryId?: string
}

export const ExportMostTrendingProductsToCsvFileController = (
  reportsService: IReportsService,
) => {
  return {
    async handle(http: IHttp) {
      const { startDate, endDate, categoryId } = http.getQueryParams<QueryParams>()
      
      const response = await reportsService.exportMostTrendingProductsToCsvFile({
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        categoryId,
      })

      if (response.isFailure) {
        return response.throwError()
      }

      const csvBuffer = response.body

      return http.sendFile(
        csvBuffer,
        'produtos-de-maior-tendencia.csv',
        'csv',
        HTTP_STATUS_CODE.ok,
      )
    },
  }
}
