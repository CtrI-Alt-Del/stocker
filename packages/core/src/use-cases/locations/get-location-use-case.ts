import { NotFoundError } from "../../errors";
import type { ILocationsRepository, ILocationsService } from "../../interfaces";

export class GetLocationUseCase{
  private readonly locationsRepository: ILocationsRepository
  constructor(locationsRepository: ILocationsRepository){
    this.locationsRepository = locationsRepository
  }
  async execute(locationId:string){
    const location = await this.locationsRepository.findById(locationId)
    if(!location){
      throw new NotFoundError("Local nao encontrado")
    }
    return location.dto
  }
}
