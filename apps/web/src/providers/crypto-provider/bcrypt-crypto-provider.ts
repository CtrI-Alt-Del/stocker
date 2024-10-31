import bcrypt from 'bcrypt'

import type { ICryptoProvider } from '@stocker/core/interfaces'

export const BcryptCryptoProvider = (): ICryptoProvider => {
  return {
    async hash(value: string) {
      const saltRounds = 5
      const salt = await bcrypt.genSalt(saltRounds)
      const hash = await bcrypt.hash(value, salt)
      return hash
    },

    async validateHash(value: string, hash: string) {
      const isValid = await bcrypt.compare(value, hash)
      return isValid
    },
  }
}
