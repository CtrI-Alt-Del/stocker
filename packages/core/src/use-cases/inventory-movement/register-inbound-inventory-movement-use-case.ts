import type { IInventoryMovementsRepository } from '../../interfaces/repositories/inventory-movements-repository'
import type { IBatchesRepository } from '../../interfaces'
import type { BatchDto, InventoryMovementDto } from '../../dtos'
import { ConflictError } from '../../errors'
import { Batch, InventoryMovement } from '../../domain/entities'

type Request = {
  batchDto: BatchDto
  inventoryMovementDto: InventoryMovementDto
}

export class RegisterInboundInventoryMovementUseCase {
  private readonly batchRepository: IBatchesRepository
  private readonly inventorymovementRepository: IInventoryMovementsRepository

  constructor(
    batchRepository: IBatchesRepository,
    inventorymovementRepository: IInventoryMovementsRepository,
  ) {
    this.batchRepository = batchRepository
    this.inventorymovementRepository = inventorymovementRepository
  }

  async execute({ batchDto, inventoryMovementDto }: Request) {
    const productId = batchDto.productId
    if (!productId) throw new ConflictError('Produto não existe')

    const batch = Batch.create(batchDto)
    await this.batchRepository.add(batch)

    const movement = InventoryMovement.create(inventoryMovementDto)
    await this.inventorymovementRepository.add(movement)
  }
}
