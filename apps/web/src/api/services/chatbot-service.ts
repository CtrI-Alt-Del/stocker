import type { MessageDto } from '@stocker/core/dtos'
import type { IApiClient, IChatbotService } from '@stocker/core/interfaces'

export const ChatbotService = (apiClient: IApiClient): IChatbotService => {
  return {
    async getAllMessages(userId: string, companyId: string) {
      apiClient.setParam('userId', userId)
      apiClient.setParam('companyId', companyId)
      return await apiClient.get<MessageDto[]>('/chatbot/messages')
    },

    async sendMessage(messageDto: MessageDto) {
      return await apiClient.post<MessageDto>('/chatbot/messages', messageDto)
    },
  }
}
