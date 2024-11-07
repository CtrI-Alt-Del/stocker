import type { IBatchesRepository, IInventoryMovementsRepository } from '../../interfaces'
type Request = {
  companyId:string
}
export class ReportInventorySummaryUseCase {
  private readonly batchesRepository: IBatchesRepository
  private readonly inventoryMovementsRepository: IInventoryMovementsRepository
  constructor(
    batchesRepository: IBatchesRepository,
    inventoryMovementsRepository: IInventoryMovementsRepository,
  ) {
    this.batchesRepository = batchesRepository
    this.inventoryMovementsRepository = inventoryMovementsRepository
  }

  async execute({companyId}:Request) {
    const [
      batchescount,
      itemscount,
      inboundinventorymovementscount,
      outboundinventorymovementscount,
    ] = await Promise.all([
      this.batchesRepository.count(companyId),
      this.batchesRepository.countItems(companyId),
      this.inventoryMovementsRepository.countInbound(companyId),
      this.inventoryMovementsRepository.countOutbound(companyId),
    ])

    return {
      batchescount: batchescount,
      itemscount: itemscount,
      inboundinventorymovementscount: inboundinventorymovementscount,
      outboundinventorymovementscount: outboundinventorymovementscount,
    }
  }
}
