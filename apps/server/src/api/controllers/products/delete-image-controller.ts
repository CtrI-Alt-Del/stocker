import type { IFileStorageProvider } from '@stocker/core/interfaces'
import type { IHttp } from '@stocker/core/interfaces'

type Body = {
  fileId: string
}

export class DeleteImageController {
  private fileStorageProvider: IFileStorageProvider

  constructor(fileStorageProvider: IFileStorageProvider) {
    this.fileStorageProvider = fileStorageProvider
  }

  async handle(http: IHttp): Promise<unknown> {
    const { fileId } = http.getBody<Body>()
    await this.fileStorageProvider.delete(fileId)
    return http.send(null)
  }
}
