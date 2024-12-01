import { useCallback, useEffect } from 'react'

import { REALTIME_EVENTS } from '@stocker/core/constants'

import { BROWSER_ENV } from '@/constants'
import { useWebSocket } from './use-websocket'

import { useToast } from './use-toast'
import { useAuthContext } from '../components/contexts/auth-context'

type UseNotificationWebSocketProps = {
  userId?: string
  onGenerate: (chunck: string) => void
}

export function useAiReportWebSocket({
  userId,
  onGenerate,
}: UseNotificationWebSocketProps) {
  const { showError } = useToast()

  const { sendResponse } = useWebSocket({
    url: `${BROWSER_ENV.serverRealtimeUrl}/reports/inventory/ai/${userId}`,
    onResponse(response) {
      switch (response.event) {
        case REALTIME_EVENTS.aiReportRoom.generated:
          onGenerate(response.payload)
          break
      }
    },
    onError() {
      if (userId) showError('Não possível se conectar com a IA analisadora :(')
    },
  })

  const generate = useCallback(() => {
    sendResponse(REALTIME_EVENTS.aiReportRoom.requested)
  }, [sendResponse])

  return {
    generate,
  }
}
