import type { IHttp } from '@stocker/core/interfaces'

import { fileStorageProvider } from '@/providers'

export class UploadImageController {
  async handle(http: IHttp) {
    const imageFileBuffer = await http.getImageFile()
    const url = await fileStorageProvider.upload(imageFileBuffer)
    return http.send({ imageUrl: url })
  }
}
