import type { MessageDto } from '../../dtos'
import type { ApiResponse } from '../../responses'

export interface IChatbotService {
  getAllMessages(userId: string, companyId: string): Promise<ApiResponse<MessageDto[]>>
  sendMessage(messageDto: MessageDto): Promise<ApiResponse<MessageDto>>
}
