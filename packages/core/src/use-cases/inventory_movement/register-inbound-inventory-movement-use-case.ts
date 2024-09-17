import { IInventoryMovementsRepository } from "../../interfaces/repositories/inventory-movements";
import { IBatchesRepository } from "../../interfaces";
import { BatchDto, InventoryMovementDto } from "../../dtos";
import { ConflictError } from "../../errors";
import { Batch, InventoryMovement } from "../../domain/entities";

type Request = {
	batchDto: BatchDto
	inventoryMovementDto: InventoryMovementDto
}

export class RegisterInboundInventoryMovementUseCase {
	private readonly inventorymovementRepository: IInventoryMovementsRepository
	private readonly batchRepository: IBatchesRepository

	constructor(inventorymovementRepository: IInventoryMovementsRepository, batchRepository: IBatchesRepository) {
		this.inventorymovementRepository = inventorymovementRepository, this.batchRepository = batchRepository
	}

	async execute({ batchDto, inventoryMovementDto }: Request) {
		const productId = batchDto.productId
		if (productId) {
			const product = await this.batchRepository.findById(productId)
			if (!product) throw new ConflictError('Produto não existe')
		}

		const movement = InventoryMovement.create(inventoryMovementDto)
		await this.inventorymovementRepository.add(movement)

		const batch = Batch.create(batchDto)
		await this.batchRepository.add(batch)
    return batch.id, movement.id

	}
}
