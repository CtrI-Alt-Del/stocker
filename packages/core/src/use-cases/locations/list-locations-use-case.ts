import type { ILocationsRepository } from '../../interfaces'
import { PaginationResponse } from '../../responses'

type Request = {
  page: number
  companyId: string
}

export class ListLocationsUseCase {
  private readonly locationsRepository: ILocationsRepository

  constructor(locationsRepository: ILocationsRepository) {
    this.locationsRepository = locationsRepository
  }

  async execute({ page, companyId }: Request) {
    const locations = await this.locationsRepository.findMany({ page, companyId })
    const locationsCount = await this.locationsRepository.count()
    return new PaginationResponse({
      items: locations.map((location) => location.dto),
      itemsCount: locationsCount
    })
  }
}
