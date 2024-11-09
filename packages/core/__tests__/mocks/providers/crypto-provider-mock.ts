import { v4 as uuid } from 'uuid'

import type { ICryptoProvider } from '../../../src/interfaces'

export class CryptoProviderMock implements ICryptoProvider {
  hashes: Record<string, string> = {}

  async hash(value: string): Promise<string> {
    const hash = uuid()
    this.hashes[hash] = value
    return hash
  }

  async token(): Promise<string> {
    return uuid()
  }

  async validateHash(value: string, hash: string): Promise<boolean> {
    return this.hashes[hash] === value
  }
}
