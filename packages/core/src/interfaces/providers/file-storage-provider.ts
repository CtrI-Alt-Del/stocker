export interface IFileStorageProvider {
  upload(fileBuffer: Buffer): Promise<string>
  delete(fileId: string): Promise<void>
}
