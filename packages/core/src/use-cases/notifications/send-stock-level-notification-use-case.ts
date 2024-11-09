import type { INotificationsSocket, IProductsRepository } from '../../interfaces'
import type { INotificationsRepository } from '../../interfaces'
import { StockLevelNotification } from '../../domain/entities'
import { NotFoundError } from '../../errors'

export class SendStockLevelNotificationsUseCase {
  constructor(
    private readonly notificationsRepository: INotificationsRepository,
    private readonly productsRepository: IProductsRepository,
    private readonly notificstionsSocket: INotificationsSocket,
  ) {}

  async execute(productId: string): Promise<void> {
    const product = await this.productsRepository.findById(productId)
    if (!product)
      throw new NotFoundError('Produto não encontrado ao enviar notificação de estoque')

    if (product.stockLevel === 'danger') {
      const notification = StockLevelNotification.create({
        product: { id: product.id, name: product.name, code: product.code },
        companyId: product.companyId,
      })

      await this.notificationsRepository.addStockLevelNotification(notification)

      this.notificstionsSocket.emitStockLevelNotification(notification)
    }
  }
}
