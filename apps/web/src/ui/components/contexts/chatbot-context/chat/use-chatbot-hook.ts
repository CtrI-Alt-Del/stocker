import { CACHE } from '@/constants'
import { useApi, useCache, useToast } from '@/ui/hooks'
import { useAuthContext } from '@/ui/components/contexts/auth-context'
import { useState } from 'react'
import type { MessageDto } from '@stocker/core/dtos'

export function useChatbot() {
  const { chatbotService } = useApi()
  const { showError } = useToast()
  const { user, company } = useAuthContext()
  const [message, setMessage] = useState('')

  async function fetchAllMessages() {
    if (!user || !company) return

    const response = await chatbotService.getAllMessages(user.id, company.id)
    if (response.isFailure) {
      showError(response.errorMessage)
    }
    return response.body
  }

  const { data, isFetching, refetch } = useCache({
    fetcher: fetchAllMessages,
    key: CACHE.chatbot.key,
    dependencies: [user?.id, company?.id],
  })

  async function sendMessage(content: string) {
    if (!user || !company || !content.trim()) return

    const message: MessageDto = {
      userId: user.id,
      companyId: company.id,
      content: content.trim(),
      sender: user.id,
      createdAt: new Date()
    }

    const response = await chatbotService.sendMessage(message)
    if (response.isFailure) {
      showError(response.errorMessage)
      return
    }

    refetch()
    return response.body
  }

  function handleMessageChange(newMessage: string) {
    setMessage(newMessage)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return
    await sendMessage(message)
    handleMessageChange('')
  }

  return {
    messages: data ?? [],
    isFetching,
    message,
    sendMessage,
    handleMessageChange,
    handleSubmit
  }
}
