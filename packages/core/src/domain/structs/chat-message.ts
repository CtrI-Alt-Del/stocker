import type { ChatMessageDto } from '../../dtos'

export class ChatMessage {
  readonly content: string
  readonly sender: string
  readonly sentAt: Date

  private constructor(dto: ChatMessageDto) {
    this.content = dto.content
    this.sentAt = dto.sentAt
    this.sender = dto.sender
  }

  static create(dto: ChatMessageDto) {
    return new ChatMessage(dto)
  }
}
