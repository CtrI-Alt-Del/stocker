import { productsRepository } from "@/database";
import { HTTP_STATUS_CODE } from "@stocker/core/constants";
import { IHttp } from "@stocker/core/interfaces";
import { ReportStockLevelUseCase } from "@stocker/core/use-cases";

export class StockLevelReportController {
  async handle(http: IHttp) {
    const body = http.getBody<Body>()
    const usecase = new ReportStockLevelUseCase(productsRepository)
    await usecase.execute()

    return http.send(HTTP_STATUS_CODE.ok)
  }
}
