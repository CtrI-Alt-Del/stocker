import { useCallback } from 'react'
import useReactWebSocket, { ReadyState } from 'react-use-websocket'

import { RealtimeResponse } from '@stocker/core/responses'

type UseWebSocketProps = {
  url: string
  onError?: () => void
  onResponse?: (response: RealtimeResponse<any>) => void
}

export function useWebSocket({ url, onError, onResponse }: UseWebSocketProps) {
  const handleMessage = useCallback(
    (message: MessageEvent) => {
      if (!onResponse) return
      const response = RealtimeResponse.parseMessage(message.data)
      console.log('useChatSocket', response)

      onResponse(response)
    },
    [onResponse],
  )

  const { sendMessage, readyState } = useReactWebSocket(url, {
    onMessage: handleMessage,
    onError,
    share: false,
  })

  const sendResponse = useCallback(
    (event: string, payload: unknown = null) => {
      const response = new RealtimeResponse({
        event,
        payload,
      })

      sendMessage(response.message)
    },
    [sendMessage],
  )

  return {
    isOpen: readyState === ReadyState.OPEN,
    sendResponse,
  }
}
