import type { ChatMessageDto } from '../../dtos'
import type { ApiResponse } from '../../responses'

export interface IChatbotService {
  getAllChatMessages(
    sessionId: string,
    userId: string,
  ): Promise<ApiResponse<ChatMessageDto[]>>
  sendChatMessage(
    companyId: string,
    userId: string,
    sessionId: string,
    userRole: string,
    content: string,
  ): Promise<ApiResponse<ChatMessageDto>>
}
