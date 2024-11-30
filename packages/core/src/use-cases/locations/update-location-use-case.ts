import { string } from "zod";
import { Company } from "../../domain/entities";
import type { LocationDto } from "../../dtos";
import { ConflictError, NotFoundError } from "../../errors";
import type { ILocationsRepository } from "../../interfaces";

type Request = {
    locationDto: Partial<LocationDto>
    locationId: string
    companyId: string
  }
  
export class UpdateLocationUseCase {
    private readonly locationsRepository: ILocationsRepository

    constructor(locationsRepository: ILocationsRepository) {
        this.locationsRepository = locationsRepository
    }
    async execute({ locationDto, locationId, companyId }: Request) {
        const location = await this.locationsRepository.findById(locationId)

        if (!location) {
            throw new NotFoundError('Localização não encontrada')
          }
        if (locationDto.name) {
            const locationName = await this.locationsRepository.findByName(locationDto.name)
            if (locationName !== null && locationName.dto.companyId === companyId) {
                throw new ConflictError('Nome já em uso por outra localização no sistema')
              }
        }
        const updatedLocation = location.update(locationDto)
        await this.locationsRepository.update(updatedLocation, locationId)
    }
}