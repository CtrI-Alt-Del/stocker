import type { IFileStorageProvider } from '../../interfaces'

export class UploadImageUseCase {
  constructor(private readonly fileStorageProvider: IFileStorageProvider) {}

  async execute(imageFileBuffer: Buffer) {
    const url = await this.fileStorageProvider.upload(imageFileBuffer)
    return url
  }
}
