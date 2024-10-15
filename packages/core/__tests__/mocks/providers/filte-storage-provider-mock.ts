import type { IFileStorageProvider } from '../../../src/interfaces'

export class FileStorageProviderMock implements IFileStorageProvider {
  storegedFileBuffer: Buffer | null = null

  async upload(fileBuffer: Buffer): Promise<string> {
    this.storegedFileBuffer = fileBuffer

    return ''
  }

  async delete(fileId: string): Promise<void> {
    this.storegedFileBuffer = null
  }
}
