import type { IApiClient, IChatbotService } from '@stocker/core/interfaces'
import type { ChatMessageDto } from '@stocker/core/dtos'
import { ChatMessage } from '@stocker/core/structs'
import { ApiResponse } from '@stocker/core/responses'

type ChatMessageResponse = {
  content: string
  sender: string
  sent_at: string
}

export const ChatbotService = (apiClient: IApiClient): IChatbotService => {
  const MODULE = '/chatbot'

  return {
    async getAllChatMessages(sessionId: string, userId: string) {
      const response = await apiClient.get<ChatMessageResponse[]>(
        `${MODULE}/messages/${userId}/${sessionId}`,
      )

      if (response.isFailure) {
        return new ApiResponse({ errorMessage: response.errorMessage })
      }

      const chatMessages = response.body.map((chatMessage) =>
        ChatMessage.create({
          content: chatMessage.content,
          sender: chatMessage.sender,
          sentAt: new Date(chatMessage.sent_at),
        }),
      )

      return new ApiResponse({ body: chatMessages })
    },

    async sendChatMessage(
      companyId: string,
      userId: string,
      sessionId: string,
      userRole: string,
      message: string,
    ) {
      console.log({ userRole })
      const response = await apiClient.post<ChatMessageResponse>(
        `${MODULE}/messages/${userId}/${sessionId}`,
        {
          company_id: companyId,
          user_role: userRole,
          message,
        },
      )

      if (response.isFailure) {
        return new ApiResponse({ errorMessage: response.errorMessage })
      }

      return new ApiResponse({
        body: {
          content: response.body.content,
          sender: response.body.sender,
          sentAt: new Date(response.body.sent_at),
        },
      })
    },
  }
}
