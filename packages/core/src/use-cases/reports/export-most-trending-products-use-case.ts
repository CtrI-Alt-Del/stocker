import type { ICsvProvider, IProductsRepository } from '../../interfaces'
import { Datetime } from '../../libs'
import { ValidationError } from '../../errors'

type Request = {
  startDate?: Date
  endDate?: Date
}

export class ExportMostTrendingProductsToCsvFileUseCase {
  constructor(
    private readonly productsRepository: IProductsRepository,
    private readonly csvProvider: ICsvProvider,
  ) {}

  async execute({ startDate, endDate }: Request) {
    if (startDate && endDate && new Datetime(startDate).isGreaterThan(endDate)) {
      throw new ValidationError('Data de início não pode ser maior que a data final')
    }

    if (!startDate || !endDate) {
      const now = new Date()
      startDate = new Datetime(now).subtractDays(7)
      endDate = now
    }

    const { products } = await this.productsRepository.findOrderByInventoryMovementsCount(
      {
        startDate,
        endDate,
      },
    )

    this.csvProvider.addColumns([
      { header: 'Posição', key: 'position' },
      { header: 'Nome', key: 'name' },
      { header: 'Estoque atual', key: 'currentStock' },
      { header: 'Estoque mínimo', key: 'minimumStock' },
      { header: 'Nível de estoque', key: 'stockLevel' },
      {
        header: 'Qtd. de lançamentos estoque de saída',
        key: 'outboundInventoryMovementsCount',
      },
    ])

    this.csvProvider.addRows(
      products.map((product, index) => {
        let stockLevel = ''

        switch (product.stockLevel) {
          case 'safe':
            stockLevel = 'ideal'
            break
          case 'average':
            stockLevel = 'em baixa'
            break
          default:
            stockLevel = 'esgotado'
        }

        return {
          position: index + 1,
          name: product.name,
          currentStock: product.currentStock,
          minimumStock: product.minimumStock,
          stockLevel,
          outboundInventoryMovementsCount: product.outboundInventoryMovementsCount,
        }
      }),
    )

    return await this.csvProvider.getXlsxFileBuffer()
  }
}
