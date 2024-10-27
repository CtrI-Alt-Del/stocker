export interface ICryptoProvider {
  hash(value: string): Promise<string>
  validateHash(value: string, hash: string): Promise<boolean>
}
