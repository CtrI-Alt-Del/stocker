import { fileStorageProvider } from '@/providers'
import type { IHttp } from '@stocker/core/interfaces'

type Body = {
  fileId: string
}

export class DeleteImageController {
  async handle(http: IHttp): Promise<unknown> {
    const { fileId } = http.getBody<Body>()
    await fileStorageProvider.delete(fileId)
    return http.send(null)
  }
}
