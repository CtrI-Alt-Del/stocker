import { useCallback } from 'react'
import useReactWebSocket, { ReadyState } from 'react-use-websocket'

import { RealtimeResponse } from '@stocker/core/responses'

type UseWebSocketProps = {
  url: string
  isEnable?: boolean
  onOpen?: () => void
  onError?: () => void
  onResponse?: (response: RealtimeResponse<any>) => void
}

export function useWebSocket({
  url,
  isEnable = true,
  onOpen,
  onError,
  onResponse,
}: UseWebSocketProps) {
  const handleMessage = useCallback(
    (message: MessageEvent) => {
      if (!onResponse) return
      const response = RealtimeResponse.parseMessage(message.data)

      onResponse(response)
    },
    [onResponse],
  )

  const handleError = useCallback(
    (error: WebSocketEventMap['error']) => {
      if (!onError) return
      console.error('Websocket error: ', error)
      onError()
    },
    [onError],
  )

  const handleOpen = useCallback(() => {
    if (!onOpen) return
    onOpen()
  }, [onOpen])

  const { readyState, sendMessage } = useReactWebSocket(isEnable ? url : null, {
    onMessage: handleMessage,
    onError: handleError,
    onOpen: handleOpen,
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
