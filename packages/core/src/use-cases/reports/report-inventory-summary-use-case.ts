import type { IBatchesRepository, IInventoryMovementsRepository, IProductsRepository } from '../../interfaces'

type Request = {
  companyId:string
}
export class ReportInventorySummaryUseCase {
  private readonly batchesRepository: IBatchesRepository
  private readonly inventoryMovementsRepository: IInventoryMovementsRepository
  private readonly productsRepository: IProductsRepository
  constructor(
    batchesRepository: IBatchesRepository,
    inventoryMovementsRepository: IInventoryMovementsRepository,
    productsRepository: IProductsRepository,
  ) {
    this.batchesRepository = batchesRepository
    this.inventoryMovementsRepository = inventoryMovementsRepository
    this.productsRepository = productsRepository
  }

  async execute({companyId}:Request) {
    const [
      batchesCount,
      itemsCount,
      inboundInventoryMovementsCount,
      outboundInventoryMovementsCount,
      inventoryValue,
    ] = await Promise.all([
      this.batchesRepository.count(companyId),
      this.batchesRepository.countItems(companyId),
      this.inventoryMovementsRepository.countInbound(companyId),
      this.inventoryMovementsRepository.countOutbound(companyId),
      this.productsRepository.calculateInventoryValue(companyId),
    ])

    return {
      batchesCount,
      itemsCount,
      inboundInventoryMovementsCount,
      outboundInventoryMovementsCount,
      inventoryValue,
    }
  }
}
