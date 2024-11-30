export interface IAiProvider {
  generateContent(propmt: string, onGenerateChunk: (chunk: string) => void): Promise<void>
}
