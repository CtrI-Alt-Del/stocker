import { ExportMostTrendingProductsToCsvFileUseCase } from '@stocker/core/use-cases'
import { HTTP_STATUS_CODE } from '@stocker/core/constants'
import type { IHttp } from '@stocker/core/interfaces'

import { CsvProvider } from '@/providers/csv-provider'
import { productsRepository } from '@/database'

type Query = {
  startDate?: string
  endDate?: string
}

export class ExportMostTrendingProductsToCsvFileController {
  async handle(http: IHttp) {
    const { startDate, endDate } = http.getQueryParams<Query>()

    const csvProvider = new CsvProvider()
    const useCase = new ExportMostTrendingProductsToCsvFileUseCase(
      productsRepository,
      csvProvider,
    )

    const csvBuffer = await useCase.execute({
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
    })

    http.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    )
    http.setHeader(
      'Content-Disposition',
      'attachment; filename="produtos-de-maior-tendencia.xlsx"',
    )

    return http.send(csvBuffer, HTTP_STATUS_CODE.ok)
  }
}