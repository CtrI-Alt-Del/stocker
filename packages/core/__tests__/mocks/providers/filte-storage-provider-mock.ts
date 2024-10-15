import type { IFileStorageProvider } from '../../../src/interfaces'

export class FileStorageProviderMock implements IFileStorageProvider {
  storegedFileBuffer: Buffer | null = null

  async upload(fileBuffer: Buffer): Promise<string> {
    this.storegedFileBuffer = fileBuffer

    return 'url from file storage'
  }

  async delete(fileId: string): Promise<void> {
    this.storegedFileBuffer = null
  }
}
