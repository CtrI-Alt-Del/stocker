import { INVENTORY_CSV_FILE_COLUMNS } from '../../constants'
import type { Product } from '../../domain/entities'
import type { IProductsRepository, ICsvProvider } from '../../interfaces'
import type { StockLevel } from '../../types'

type Request = {
  productName?: string
  companyId: string
  locationId?: string
  categoryId?: string
  stockLevel?: StockLevel
  supplierId?: string
}

export class ExportInventoryToCsvFileUseCase {
  private readonly productsRepository: IProductsRepository
  private readonly csvProvider: ICsvProvider

  constructor(productsRepository: IProductsRepository, csvProvider: ICsvProvider) {
    this.productsRepository = productsRepository
    this.csvProvider = csvProvider
  }

  async execute({
    companyId,
    categoryId,
    locationId,
    productName,
    stockLevel,
    supplierId,
  }: Request) {
    const { products } =
      await this.productsRepository.findManyWithInventoryMovementsCount({
        companyId,
        categoryId,
        locationId,
        productName,
        stockLevel,
        supplierId,
      })

    console.log(products.map((product) => product.stockLevel))

    const csvProducts = products.filter((product) => product.isActive)

    this.csvProvider.addColumns(INVENTORY_CSV_FILE_COLUMNS)

    this.csvProvider.addRows(
      csvProducts.map((product: Product) => {
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
