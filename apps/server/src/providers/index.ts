import { SupabaseFileStorageProvider } from './file-storage-provider'
import { BcryptCryptoProvider } from './crypto-provider'

export const fileStorageProvider = new SupabaseFileStorageProvider()
export const cryptoProvider = new BcryptCryptoProvider()
