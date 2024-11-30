import type { LocationDto } from '../../dtos'
import type { ILocationsRepository } from '../../interfaces'
import { PaginationResponse } from '../../responses'

type Request = {
  companyId: string
  page: number
  name?: string
}

export class ListLocationsUseCase {
  private readonly locationsRepository: ILocationsRepository

  constructor(locationsRepository: ILocationsRepository) {
    this.locationsRepository = locationsRepository
  }

  async execute({
    companyId,
    page,
    name,
  }: Request): Promise<PaginationResponse<LocationDto>> {
    const locations = await this.locationsRepository.findMany({ name, companyId, page })
    return new PaginationResponse({
      items: locations.locations.map((location) => location.dto),
      itemsCount: locations.count,
    })
  }
}
