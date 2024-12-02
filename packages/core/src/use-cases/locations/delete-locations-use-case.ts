import { NotFoundError } from '../../errors'
import type { ILocationsRepository } from '../../interfaces'

type Request = {
  locationsId: string
}

export class DeleteLocationsUseCase {
  private readonly locationsRepository: ILocationsRepository

  constructor(locationsRepository: ILocationsRepository) {
    this.locationsRepository = locationsRepository
  }

  async execute({ locationsId }: Request): Promise<void> {
    const existingLocation = await this.locationsRepository.findById(locationsId)
    if (!existingLocation) {
      throw new NotFoundError('Local não encontrado')
    }
    await this.locationsRepository.deleteById(locationsId)
  }
}
