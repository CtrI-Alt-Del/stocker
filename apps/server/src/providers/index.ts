import { SupabaseFileStorageProvider } from './file-storage-provider'
import { BcryptCryptoProvider } from './crypto-provider'
import { EmailProvider } from './email-provider'

export const fileStorageProvider = new SupabaseFileStorageProvider()
export const cryptoProvider = new BcryptCryptoProvider()
export const emailProvider = new EmailProvider()
