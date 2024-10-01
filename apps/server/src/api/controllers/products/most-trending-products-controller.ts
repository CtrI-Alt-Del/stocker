import { MostTrendingProductsUseCase } from '@stocker/core/use-cases';
import { productsRepository } from '@/database';
import { IHttp } from '@stocker/core/interfaces';
import { HTTP_STATUS_CODE } from '@stocker/core/constants';

export class MostTrendingProductsController {
  async handle(http: IHttp) {
    const { startDate, endDate } = http.getQueryParams<{ startDate?: Date; endDate?: Date }>();
    const useCase = new MostTrendingProductsUseCase(productsRepository);
    const result = await useCase.execute({ startDate, endDate });

    return http.send({ products: result.products.map(product => product.dto) }, HTTP_STATUS_CODE.ok);
  }
}
