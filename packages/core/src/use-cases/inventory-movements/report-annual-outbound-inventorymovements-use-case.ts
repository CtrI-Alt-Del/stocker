import type { InventoryMovement } from '@stocker/core/entities'
import type { InventoryMovementDto } from '../../dtos'
import { NotAllowedError, NotFoundError } from '../../errors'
import type {
  IBatchesRepository,
  IInventoryMovementsRepository,
  IProductsRepository,
} from '../../interfaces'


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

      const formattedMovements = this.formatByLast12Months(inventoryMovements);
      
      return { months: formattedMovements }
      
    } catch (error) {
      console.error('Error in use case execution:', error)
      throw error
    }
  }

  private formatByLast12Months(inventoryMovements: InventoryMovement[]) {
    // Obtém o mês e ano atuais
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const months: { name: string, label: string, year: number, inboundMovementsCount: number, outboundMovementsCount: number }[] = [];

    for (let i = 0; i < 12; i++) {
      const monthDate = new Date(currentYear, currentMonth - i);
      const monthName = monthDate.toLocaleString('default', { month: 'long' });
      const label = monthDate.toLocaleString('pt-BR', { month: 'long' });
      months.push({
        name: monthName,
        label: label,
        year: monthDate.getFullYear(),
        inboundMovementsCount: 0,
        outboundMovementsCount: 0,
      });
    }

    inventoryMovements.forEach((movement) => {
      const movementDate = new Date(movement.registeredAt);
      const movementMonth = movementDate.getMonth();
      const movementYear = movementDate.getFullYear();

      const monthIndex = months.findIndex(
        (month) => month.year === movementYear && new Date(movementYear, movementMonth).toLocaleString('default', { month: 'long' }) === month.name
      );

      if (monthIndex !== -1 && months[monthIndex]) {
          if (movement.movementType === 'inbound') {
            months[monthIndex].inboundMovementsCount += movement.itemsCount;
          } else if (movement.movementType === 'outbound') {
            months[monthIndex].outboundMovementsCount += movement.itemsCount;
          }
      }
    });

    return months
  }
}
  