import { NotFoundError } from '../../errors'
import type { ICompaniesRepository, INotificationsSocket } from '../../interfaces'

type Request = {
  companyId: string
}

export class DeleteCompanyUseCase {
  constructor(
    private readonly companiesRepository: ICompaniesRepository,
    private readonly notificationsSocket: INotificationsSocket,
  ) {}

  async execute({ companyId }: Request) {
    const company = await this.companiesRepository.findById(companyId)
    if (!company) throw new NotFoundError('Empresa não encontrada')

    await this.companiesRepository.delete(companyId)
    this.notificationsSocket.emitCompanyDeletedNotification()
  }
}
