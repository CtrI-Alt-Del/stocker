import { IBatchesRepository, IInventoryMovementsRepository } from "../../interfaces"

export class ReportInventorySummaryUseCase {
  private readonly batchesRepository: IBatchesRepository
  private readonly inventoryMovementsRepository: IInventoryMovementsRepository
  constructor(batchesRepository: IBatchesRepository, inventoryMovementsRepository: IInventoryMovementsRepository) {
    this.batchesRepository = batchesRepository, this.inventoryMovementsRepository = inventoryMovementsRepository
  }

  async execute() {
    const [batchescount, itemscount, inboundinventorymovementscount, outboundinventorymovementscount] = await Promise.all([
      this.batchesRepository.count(),
      this.batchesRepository.countItems(),
      this.inventoryMovementsRepository.countInbound(),
      this.inventoryMovementsRepository.countOutbound(),
    ])
    
    return {
      batchescount: batchescount,
      itemscount: itemscount,
      inboundinventorymovementscount: inboundinventorymovementscount,
      outboundinventorymovementscount: outboundinventorymovementscount,
    }
  }
}
