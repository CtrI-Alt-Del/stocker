import { InventoryMovement } from '../../domain/entities'
import type { InventoryMovementDto } from '../../dtos'
import { NotAllowedError, NotFoundError } from '../../errors'
import type {
  IBatchesRepository,
  IInventoryMovementsRepository,
  IProductsRepository,
} from '../../interfaces'

type Request = {
  inventoryMovementDto: InventoryMovementDto
}

export class RegisterOutboundInventoryMovementUseCase {
  private readonly batchRepository: IBatchesRepository
  private readonly productsRepository: IProductsRepository
  private readonly inventorymovementRepository: IInventoryMovementsRepository

  constructor(
    batchRepository: IBatchesRepository,
    productsRepository: IProductsRepository,
    inventorymovementRepository: IInventoryMovementsRepository,
  ) {
    this.batchRepository = batchRepository
    this.productsRepository = productsRepository
    this.inventorymovementRepository = inventorymovementRepository
  }

  async execute({ inventoryMovementDto }: Request) {
    const productId = inventoryMovementDto.product.id

    const product = await this.productsRepository.findById(productId)
    if (!product) throw new NotFoundError('Produto não encontrado')
    if (!product.isActive) throw new NotAllowedError('Produto inativo')

    const inventory = InventoryMovement.create(inventoryMovementDto)

    product.reduceStock(inventory.itemsCount)

    const updatedbatches = product.updatedBatches
    if (updatedbatches.length) {
      await this.batchRepository.updateManyItemsCount(updatedbatches)
    }

    const emptyBatches = product.emptyBatches
    if (emptyBatches.length) {
      const emptyBatchesId = emptyBatches.map((batch) => batch.id)
      await this.batchRepository.deleteMany(emptyBatchesId)
    }

    await this.inventorymovementRepository.add(inventory)
  }
}
