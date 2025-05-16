import {
  type RefObject,
  useState,
  type FormEvent,
  useCallback,
  useEffect,
  useMemo,
} from 'react'

import { CACHE } from '@/constants'
import { useApi, useCache, useToast } from '@/ui/hooks'
import { useAuthContext } from '@/ui/components/contexts/auth-context'
import { ChatMessage } from '@stocker/core/structs'

export function useChatbot(scrollRef: RefObject<HTMLDivElement>) {
  const { chatbotService } = useApi()
  const { showError } = useToast()
  const { user, company } = useAuthContext()
  const [isSending, setIsSending] = useState(false)
  const [sessionId, setSessionId] = useState('3c3ff075-5932-4c37-9186-65dbae41f1dc')
  const [lastUserMessage, setLastUserMessage] = useState<ChatMessage | null>(null)

  function appendChatMessage(message: ChatMessage) {
    mutate([...(data ?? []), message])
    scrollToBottom()
  }

  async function sendChatMessage(message: string) {
    if (!user || !company) return
    setIsSending(true)

    const lastUserMessage = ChatMessage.create({
      content: message,
      sender: 'user',
      sentAt: new Date(),
    })

    setLastUserMessage(lastUserMessage)

    const response = await chatbotService.sendChatMessage(
      company.id,
      user.id,
      sessionId,
      user.role,
      message,
    )

    if (response.isFailure) {
      showError(response.errorMessage)
    }
    if (response.isSuccess) {
      refetchChatMessages()
    }

    setIsSending(false)
    setLastUserMessage(null)
    return response.body
  }

  async function fetchAllChatMessages() {
    if (!user || !sessionId) return

    const response = await chatbotService.getAllChatMessages(sessionId, user.id)

    if (response.isFailure) {
      showError(response.errorMessage)
    }
    return response.body
  }

  const { data, isFetching, refetch, mutate } = useCache({
    fetcher: fetchAllChatMessages,
    key: CACHE.chatbot.key,
    dependencies: [user?.id, sessionId],
    isEnabled: !!user?.id && !!sessionId,
    shouldRefetchOnFocus: false,
  })

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      scrollRef.current?.scrollTo({
        top: scrollRef.current?.scrollHeight,
        behavior: 'smooth',
      })
    }, 100)
  }, [scrollRef.current])

  const refetchChatMessages = useCallback(() => {
    refetch()
    scrollToBottom()
  }, [refetch, scrollToBottom])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    event.currentTarget.reset()

    const formData = new FormData(event.currentTarget)
    const userMessage = formData.get('user-message') as string

    const lastUserMessage = ChatMessage.create({
      content: userMessage,
      sender: 'user',
      sentAt: new Date(),
    })

    appendChatMessage(lastUserMessage)

    if (userMessage) {
      await sendChatMessage(userMessage)
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [scrollToBottom])

  return {
    chatMessages: data ?? [],
    lastUserMessage,
    isLoading: isFetching || isSending,
    handleSubmit,
  }
}
