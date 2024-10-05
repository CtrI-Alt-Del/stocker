import { IHttp } from '@stocker/core/interfaces';
import { HTTP_STATUS_CODE } from '@stocker/core/constants'; 
import { CsvProvider } from '@/providers/csv-provider';
import { ExportInventoryToCsvFileUseCase } from '@stocker/core/use-cases';
import { productsRepository } from '@/database';

type Query = {
  page: number
  }

export class ExportInventoryToCsvFileController {
  async handle(http: IHttp) {
    const { page } = http.getQueryParams<Query>()

    const csvProvider = new CsvProvider()
    const useCase = new ExportInventoryToCsvFileUseCase(productsRepository, csvProvider)
    const csvBuffer = await useCase.execute({
      page: page,
    })

    http.setHeader('Content-Disposition', 'attachment; filename="inventory.csv"')
    return http.send(csvBuffer, HTTP_STATUS_CODE.ok)
  }
}
