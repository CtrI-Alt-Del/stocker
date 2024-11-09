import { InventoryMovement } from '../../domain/entities'
import type { InventoryMovementDto } from '../../dtos'
import { NotAllowedError, NotFoundError } from '../../errors'
import type {
  IBatchesRepository,
  IInventoryMovementsRepository,
  IProductsRepository,
  IQueueProvider,
} from '../../interfaces'

type Request = {
  inventoryMovementDto: InventoryMovementDto
}

export class RegisterOutboundInventoryMovementUseCase {
  private readonly batchRepository: IBatchesRepository
  private readonly productsRepository: IProductsRepository
  private readonly inventoryMovementsRepository: IInventoryMovementsRepository
  private readonly queueProvider: IQueueProvider

  constructor(
    batchRepository: IBatchesRepository,
    productsRepository: IProductsRepository,
    inventoryMovementsRepository: IInventoryMovementsRepository,
    queueProvider: IQueueProvider,
  ) {
    this.batchRepository = batchRepository
    this.productsRepository = productsRepository
    this.inventoryMovementsRepository = inventoryMovementsRepository
    this.queueProvider = queueProvider
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

    await this.inventoryMovementsRepository.add(inventory)

    this.queueProvider.push('send-stock-level-notification', { productId: product.id })
  }
}
