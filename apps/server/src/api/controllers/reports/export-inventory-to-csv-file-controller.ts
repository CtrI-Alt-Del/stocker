import { HTTP_STATUS_CODE } from '@stocker/core/constants'
import { CsvProvider } from '@/providers/csv-provider'
import { ExportInventoryToCsvFileUseCase } from '@stocker/core/use-cases'
import { productsRepository } from '@/database'
import type { IHttp } from '@stocker/core/interfaces'

export class ExportInventoryToCsvFileController {
  async handle(http: IHttp) {
    const csvProvider = new CsvProvider()
    const useCase = new ExportInventoryToCsvFileUseCase(productsRepository, csvProvider)
    const csvBuffer = await useCase.execute()

    return http.send(csvBuffer, HTTP_STATUS_CODE.ok)
  }
}
