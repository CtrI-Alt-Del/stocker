export interface IAiProvider {
  generateContent(propmt: string): Promise<string>
}
