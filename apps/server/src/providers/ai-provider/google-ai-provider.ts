import { type GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai'

import type { IAiProvider } from '@stocker/core/interfaces'

export class GoogleAiProvider implements IAiProvider {
  private readonly model: GenerativeModel

  constructor() {
    const genAI = new GoogleGenerativeAI('')
    this.model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
  }

  async generateContent(prompt: string) {
    const result = await this.model.generateContentStream(prompt)

    let text = ''
    for await (const chunk of result.stream) {
      const chunkText = chunk.text()
      console.log(chunkText)
      text += chunkText
    }

    return text
  }
}
