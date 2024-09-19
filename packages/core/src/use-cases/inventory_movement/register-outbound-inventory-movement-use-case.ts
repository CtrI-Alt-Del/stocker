import { InventoryMovement } from '../../domain/entities'
import type { BatchDto, InventoryMovementDto } from '../../dtos'
import { NotFoundError } from '../../errors'
import type {
  IBatchesRepository,
  IInventoryMovementsRepository,
  IProductsRepository,
} from '../../interfaces'

type Request = {
  batchDto: BatchDto
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
    ;(this.batchRepository = batchRepository),
      (this.productsRepository = productsRepository),
      (this.inventorymovementRepository = inventorymovementRepository)
  }

  async execute({ inventoryMovementDto }: Request) {
    const productId = inventoryMovementDto.productId
    const product = await this.productsRepository.findById(productId)
    if (!product) throw new NotFoundError('Produto não existe')

    product.reduceStock(product.currentStock)
    const updatedbatches = product.updatedBatches
    await this.batchRepository.updateManyItemsCount(updatedbatches)
    const emptybatches = product.batchesWithoutStock
    const emptybatchesId = emptybatches.map((batch) => batch.id)
    await this.batchRepository.deleteMany(emptybatchesId)
    const inventory = InventoryMovement.create(inventoryMovementDto)
    await this.inventorymovementRepository.add(inventory)
  }
}
