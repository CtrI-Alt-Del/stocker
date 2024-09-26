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
    const productId = inventoryMovementDto.productId
    const product = await this.productsRepository.findById(productId)
    if (!product) throw new NotFoundError('Produto não existe')

    const inventory = InventoryMovement.create(inventoryMovementDto)

    product.reduceStock(inventory.itemsCount)
    const updatedbatches = product.updatedBatches

    await this.batchRepository.updateManyItemsCount(updatedbatches)
    const emptyBatches = product.emptyBatches
    const emptybatchesId = emptyBatches.map((batch) => batch.id)
    await this.batchRepository.deleteMany(emptybatchesId)
    await this.inventorymovementRepository.add(inventory)
  }
}
