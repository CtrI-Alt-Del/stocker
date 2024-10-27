import { SupabaseFileStorageProvider } from './file-storage-provider'
import { BcryptCryptoProvider } from './bcrypt-crypto-provider'

export const fileStorageProvider = new SupabaseFileStorageProvider()
export const cryptoProvider = new BcryptCryptoProvider()
