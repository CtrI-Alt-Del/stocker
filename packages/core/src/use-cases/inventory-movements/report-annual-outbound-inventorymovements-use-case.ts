import type { InventoryMovement } from '@stocker/core/entities'
import type { InventoryMovementDto } from '../../dtos'
import { NotAllowedError, NotFoundError } from '../../errors'
import type {
  IBatchesRepository,
  IInventoryMovementsRepository,
  IProductsRepository,
} from '../../interfaces'
import dayjs from 'dayjs'

type Request = {
  productId?: string
}

export class ReportAnnualOutboundInventorymovementsUseCase {
  private readonly inventoryMovementsRepository: IInventoryMovementsRepository
  private readonly productsRepository: IProductsRepository

  constructor(
    inventoryMovementsRepository: IInventoryMovementsRepository,
    productsRepository: IProductsRepository,
  ) {
    this.inventoryMovementsRepository = inventoryMovementsRepository
    this.productsRepository = productsRepository
  }

  async execute({ productId }: Request) {
    try {
      if (productId) {
        const product = await this.productsRepository.findById(productId)
        if (!product) {
          throw new NotFoundError('Product not found')
        }
      }

      const inventoryMovements: InventoryMovement[] = await this.inventoryMovementsRepository.findByDateRange({
        productId,
      });

      const formattedMovements = this.formatByMonth(inventoryMovements);
      
      return { months: formattedMovements }
      
    } catch (error) {
      console.error('Error in use case execution:', error)
      throw error
    }
  }

  private formatByMonth(inventoryMovements: InventoryMovement[]) {
    const months = [
      { name: 'january', label: 'janeiro', inboundMovementsCount: 0, outboundMovementsCount: 0 },
      { name: 'february', label: 'fevereiro', inboundMovementsCount: 0, outboundMovementsCount: 0 },
      { name: 'march', label: 'março', inboundMovementsCount: 0, outboundMovementsCount: 0 },
      { name: 'april', label: 'abril', inboundMovementsCount: 0, outboundMovementsCount: 0 },
      { name: 'may', label: 'maio', inboundMovementsCount: 0, outboundMovementsCount: 0 },
      { name: 'june', label: 'junho', inboundMovementsCount: 0, outboundMovementsCount: 0 },
      { name: 'july', label: 'julho', inboundMovementsCount: 0, outboundMovementsCount: 0 },
      { name: 'august', label: 'agosto', inboundMovementsCount: 0, outboundMovementsCount: 0 },
      { name: 'september', label: 'setembro', inboundMovementsCount: 0, outboundMovementsCount: 0 },
      { name: 'october', label: 'outubro', inboundMovementsCount: 0, outboundMovementsCount: 0 },
      { name: 'november', label: 'novembro', inboundMovementsCount: 0, outboundMovementsCount: 0 },
      { name: 'december', label: 'dezembro', inboundMovementsCount: 0, outboundMovementsCount: 0 },
    ];

    inventoryMovements.forEach((movement) => {
      const monthIndex = dayjs(movement.registeredAt).month();
      if(months[monthIndex]) {
        if (movement.movementType === 'inbound') {
          months[monthIndex].inboundMovementsCount += movement.itemsCount;
        } else if (movement.movementType === 'outbound') {
          months[monthIndex].outboundMovementsCount += movement.itemsCount;
        }
      }
    });
    return months;
  }
}
