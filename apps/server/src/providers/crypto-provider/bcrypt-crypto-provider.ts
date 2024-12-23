import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'

import type { ICryptoProvider } from '@stocker/core/interfaces'

export class BcryptCryptoProvider implements ICryptoProvider {
  async token() {
    return uuid()
  }

  async hash(value: string) {
    const saltRounds = 10
    const salt = await bcrypt.genSalt(saltRounds)
    const hash = await bcrypt.hash(value, salt)
    return hash
  }

  async validateHash(value: string, hash: string) {
    const isValid = await bcrypt.compare(value, hash)
    return isValid
  }
}
