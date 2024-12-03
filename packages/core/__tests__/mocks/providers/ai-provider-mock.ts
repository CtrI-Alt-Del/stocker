import type { IAiProvider } from '../../../src/interfaces'

export class AiProviderMock implements IAiProvider {
  propmt = ''

  async generateContent(
    propmt: string,
    onGenerateChunk: (chunk: string) => void,
  ): Promise<void> {
    this.propmt = propmt
    onGenerateChunk('fake chunk')
  }
}
