import { NotFoundError } from '../../errors'
import type {
  IAiProvider,
  IInventoryMovementsRepository,
  IProductsRepository,
  IUsersRepository,
} from '../../interfaces'

export class ReportInventoryWithAiUseCase {
  constructor(
    private readonly inventoryMovementsRepository: IInventoryMovementsRepository,
    private readonly productsRepository: IProductsRepository,
    private readonly usersRepository: IUsersRepository,
    private readonly aiProvider: IAiProvider,
  ) {}

  async execute(userId: string) {
    const user = await this.usersRepository.findById(userId)
    if (!user) throw new NotFoundError('Usuário não encontrado')

    const movements = await this.inventoryMovementsRepository.findAllByCompany(
      user.companyId,
    )

    let prompt = `
    Elabore um relatório de estoque detalhado com base nas movimentações de estoques abaixo.
    Considere que o estoque inicial era zero para todos os produtos.
    Não considere dados de vendas, tendências de mercado, sazonalidade e outros fatores.
    Destaque os produtos mais movimentados e menos movimentado.
    Destaque os funcionários mais ativos e menos.
    Tente prever as demandas para os próximo Mês.
    `

    for (const movement of movements) {
      prompt += `Movimentações de estoque:
      - Data: ${movement.registeredAt}
      -> Tipo: ${movement.movementType === 'inbound' ? 'ENTRADA' : 'SAÍDA'}
      -> Contagem de items movimentados: ${movement.itemsCount}
      -> Nome do produto: ${movement.product.name}
      -> Estoque atual do produto: ${movement.product.currentStock}
      -> Estoque mínimo do produto: ${movement.product.minimumStock}
      -> Funcionário responsável: ${movement.responsible.name}
      `
    }

    await this.aiProvider.generateContent(prompt)
  }

  async getMovements(companyId: string) {
    const movementsPagination = await this.inventoryMovementsRepository.count(companyId)
  }
}
