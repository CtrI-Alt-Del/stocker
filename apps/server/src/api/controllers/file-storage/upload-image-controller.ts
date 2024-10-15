import type { IHttp } from '@stocker/core/interfaces'

import { fileStorageProvider } from '@/providers'
import { UploadImageUseCase } from '@stocker/core/use-cases'

export class UploadImageController {
  async handle(http: IHttp) {
    const imageFileBuffer = await http.getImageFile()
    const useCase = new UploadImageUseCase(fileStorageProvider)
    const url = await useCase.execute(imageFileBuffer)
    return http.send({ imageUrl: url })
  }
}
