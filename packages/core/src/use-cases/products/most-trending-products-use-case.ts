import { IProductsRepository } from "../../interfaces";
import { Product } from "../../domain/entities";

type Request = {
  startDate?: Date;
  endDate?: Date;
};

type Response = {
  products: Product[];
};

export class MostTrendingProductsUseCase {
  constructor(private readonly productsRepository: IProductsRepository) {}

  async execute({ startDate, endDate }: Request): Promise<Response> {
    const now = new Date();
    const defaultStartDate = new Date(now.setDate(now.getDate() - 7));
    const defaultEndDate = new Date();

    const finalStartDate = startDate || defaultStartDate;
    const finalEndDate = endDate || defaultEndDate;

    const products = await this.productsRepository.findOrderByInventoryMovementsCount({
      startDate: finalStartDate,
      endDate: finalEndDate,
    });

    return { products };
  }
}
