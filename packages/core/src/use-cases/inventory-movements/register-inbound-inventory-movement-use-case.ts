import type { IInventoryMovementsRepository } from '../../interfaces/repositories/inventory-movements-repository'
import type { IBatchesRepository, IProductsRepository } from '../../interfaces'
import type { BatchDto, InventoryMovementDto } from '../../dtos'
import { NotAllowedError, NotFoundError } from '../../errors'
import { Batch, InventoryMovement } from '../../domain/entities'

type Request = {
  batchDto: BatchDto
  inventoryMovementDto: InventoryMovementDto
}

export class RegisterInboundInventoryMovementUseCase {
  private readonly productsRepository: IProductsRepository
  private readonly batchRepository: IBatchesRepository
  private readonly inventoryMovementRepository: IInventoryMovementsRepository

  constructor(
    productsRepository: IProductsRepository,
    batchRepository: IBatchesRepository,
    inventoryMovementRepository: IInventoryMovementsRepository,
  ) {
    this.productsRepository = productsRepository
    this.batchRepository = batchRepository
    this.inventoryMovementRepository = inventoryMovementRepository
  }

  async execute({ batchDto, inventoryMovementDto }: Request) {
    const productId = batchDto.productId
    const product = await this.productsRepository.findById(productId)
    if (!product) throw new NotFoundError('Produto não encontrado')
    if (!product.isActive) throw new NotAllowedError('Produto inativo')

    const batch = Batch.create(batchDto)
    await this.batchRepository.add(batch)

    const movement = InventoryMovement.create(inventoryMovementDto)
    await this.inventoryMovementRepository.add(movement)
  }
}
