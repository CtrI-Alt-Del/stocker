import { Product } from "../../domain/entities"
import { IProductsRepository, ICsvProvider } from "../../interfaces" 

type Request = {
  page: number
}

export class ExportInventoryToCsvFileUseCase {
  private readonly productsRepository: IProductsRepository
  private readonly csvProvider: ICsvProvider

  constructor(productsRepository: IProductsRepository, csvProvider: ICsvProvider) {
    this.productsRepository = productsRepository
    this.csvProvider = csvProvider
  }

  async execute({ page }: Request) {
    const products = await this.productsRepository.findManyWithInventoryMovements({
      page: page,
    })

    this.csvProvider.addColumns([
      { header: 'Nome', key: 'name' },
      { header: 'Qtd. de lotes', key: 'batchQuantity' },
      { header: 'Qtd. de lançamentos de entrada', key: 'entryTransactions' },
      { header: 'Qtd. de lançamentos de saída', key: 'exitTransactions' },
      { header: 'Estoque atual', key: 'currentStock' },
      { header: 'Estoque mínimo', key: 'minimumStock' },
      { header: 'Nível de estoque', key: 'stockLevel' },
    ])

    this.csvProvider.addRows(products.products.map((product: Product) => {
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
        name: product.name,
        batchQuantity: product.batchesCount,
        entryTransactions: product.inboundInventoryMovementsCount,
        exitTransactions: product.outboundInventoryMovementsCount,
        currentStock: product.currentStock,
        minimumStock: product.minimumStock,
        stockLevel: stockLevel,
        }
      }),
    )

    const csvContent = this.csvProvider.getXlsxFileBuffer()
    return csvContent
  }

}
